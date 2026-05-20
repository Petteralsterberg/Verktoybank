exports.handler = async (event) => {
  try {
    const regnr = event.queryStringParameters.regnr?.toUpperCase();

    if (!regnr) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Registreringsnummer mangler" }),
      };
    }

    const response = await fetch(
      `https://akfell-dataut.vegvesen.no/enkeltoppslag/kjoretoydata?kjennemerke=${regnr}`,
      {
        headers: {
          "SVV-Authorization": process.env.VEGVESEN_API_KEY,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
