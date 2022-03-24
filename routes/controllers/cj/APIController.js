const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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
      res.send({"response":"something went wrong :<"});
      if (err.name === "AbortError") {
        res.send("Timed out");
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
        "CJ-Access-Token": token,
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
      res.send({"response":"something went wrong :<"});
      if (err.name === "AbortError") {
        res.send("Timed out");
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
        "CJ-Access-Token": token,
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
      res.send({"response":"something went wrong :<"});
      if (err.name === "AbortError") {
        res.send("Timed out");
      }
    });
};

var Shipping = function (zip, code, country, prov, city, address, name, phone, remark, fromCountryCode, logisticName, products) {
  this.shippingZip = zip;
  this.shippingCountryCode = code;
  this.shippingCountry = country;
  this.shippingProvince = prov;
  this.shippingCity = city;
  this.shippingAddress = address;
  this.shippingCustomerName = name;
  this.shippingPhone = phone;
  this.remark = remark;
  this.fromCountryCode = fromCountryCode;
  this.logisticName = logisticName;
  this.products = products;
};

var Products = function (vid, quantity, sname) {
  this.vid = vid;
  this.quantity = quantity;
  this.shippingName = sname;
}

methods.createOrder = (req, res) => {
  const token = req.cookies.auth;
  const body = req.body.products;
  const len = body.length;

  let products = [];

  for (let i=0; i<len; i++) {
    products[i] = new Products(body[i].vid, body[i].quantity, body[i].shippingName);
  }

  let shipping = new Shipping(
    req.body.zip,
    req.body.code,
    req.body.country,
    req.body.province,
    req.body.city,
    req.body.address,
    req.body.name,
    req.body.contact,
    req.body.remark,
    req.body.ccode,
    req.body.logistic,
    products
  );

  fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder`,
    {
      headers: {
        "CJ-Access-Token": token,
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(shipping),
    }
  )
    .then((response) => {
      console.warn(response);
      if (!response.ok) {
        throw "error on fetching token";
      }
      return response.json();
    })
    .then((response) => {
      return res.send(response);
    })
    .catch((err) => {
      console.warn(err);
      res.send({"response":"something went wrong :<"});
      if (err.name === "AbortError") {
        res.send("Timed out");
      }
    });
};

module.exports = methods;
