const methods = {};

methods.getToken = (req, res) => {
  fetch(
    "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: "hyprweb@gmail.com",
        password: "02cf4f3d305f4312b865f8e8eed59c64",
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw "error on fetching token";
      }
      return response.json();
    })
    .then((response) => {
      if (response.data.accessToken) {
        const token = req.cookies.auth;
        return res.send({ nekot: token });
      }
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Timed out");
      }
    });
};

methods.getProducts = (req, res) => {
  const token = req.cookies.auth;
  const page = req.query.page;

  fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/product/list?pageNum=${page}`,
    {
      headers: {
        'CJ-Access-Token': token,
      },
      method: "GET",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw "error on fetching token";
      }
      return response.json();
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Timed out");
      }
    });
};

methods.getVariants = (req, res) => {
  const token = req.cookies.auth;
  const pid = req.query.pid;

  fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/product/variant/query?pid=${pid}`,
    {
      headers: {
        'CJ-Access-Token': token,
      },
      method: "GET",
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw "error on fetching token";
      }
      return response.json();
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Timed out");
      }
    });
};

module.exports = methods;
