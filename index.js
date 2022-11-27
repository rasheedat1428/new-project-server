const express = require("express");

const app = express();

const PORT = 6000;

const students = [
    { name: "Habeeb", email: "habeeb@habeeb.com" },
    { name: "Rasheedat", email: "rasheedat@habeeb.com" },
  ];

  app.get("/students", (req, res) => res.json(students));

  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
