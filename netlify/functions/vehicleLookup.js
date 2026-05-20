async function lookupVehicle() {
  const regnr = document.getElementById("regnrInput").value.trim().toUpperCase();

  if (!regnr) {
    alert("Skriv inn registreringsnummer");
    return;
  }

  const infoBox = document.getElementById("vehicleInfo");
  infoBox.style.display = "block";
  infoBox.innerHTML = "Henter motorkode...";

  try {
    const response = await fetch(`/.netlify/functions/vehicleLookup?regnr=${regnr}`);
    const data = await response.json();

    const kjoretoy = data?.kjoretoydataListe?.[0];
    const teknisk = kjoretoy?.godkjenning?.tekniskGodkjenning;

    const motor =
      teknisk?.motorOgDrivverk?.motor?.[0]?.motorKode ||
      teknisk?.motorOgDrivverk?.motor?.motorKode ||
      teknisk?.motorOgDrivverk?.motor?.[0]?.betegnelse ||
      teknisk?.motorOgDrivverk?.motor?.betegnelse ||
      "";

    if (!motor) {
      infoBox.innerHTML = `<strong>${regnr}</strong><br>Fant ikke motorkode.`;
      return;
    }

    infoBox.innerHTML = `
      <strong>${regnr}</strong><br>
      Motorkode: ${motor}
    `;

    document.getElementById("search").value = motor;
    render();

  } catch (err) {
    console.error(err);
    infoBox.innerHTML = "Feil ved oppslag.";
  }
}
