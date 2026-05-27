exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const ok =
      body.password === process.env.ADMIN_PASSWORD;

    return {
      statusCode: 200,
      body: JSON.stringify({ ok }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
      }),
    };
  }
};
