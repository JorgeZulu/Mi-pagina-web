const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const properties = require("./server/src/config/properties");
const usersRoutes = require("./server/src/config/users/users.routes");
const db = require("./server/src/config/database");
const User = require("./users/models/user");
const Swal = require("sweetalert2");

//init db

db();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
const app = express();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(
  express.static(path.join(__dirname, "users"), { index: "tienda.html" })
);
// init routes

const router = express.Router();

// use express routes

app.use("/api", router);
usersRoutes(router);

app.listen(properties.PORT, () =>
  console.log(`Server is running on ${properties.PORT}`)
);

app.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((docs) => {
      if (!docs) {
        res.status(500).send("EL USUARIO NO EXISTE");
      } else {
        docs.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.status(500).send("ERROR AL AUTENTICAR EL USUARIO");
          } else if (result) {
            res.redirect("./tienda.html")
          } else {
            res.status(500).send(`USUARIO Y/O CONTRASEÑA INCORRECTA ${result}`);
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send(`ERROR AL AUTENTICAR EL USUARIO ${err}`);
    });
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });

  user
    .save()
    .then((status) => {
      res.status(200).send("USUARIO REGISTRADO");
    })
    .catch((err) => {
      res.status(500).send(`ERROR AL REGISTRAR EL USUARIO ${err}`);
    });
});

module.exports = app;
