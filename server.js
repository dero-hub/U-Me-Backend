const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db.config");
const Role = db.roles
const Permission = db.permission


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
  init();
});

let init = () => {
  Permission.create({id: 1, name: "create"});
  Permission.create({id: 2, name: "view"});
  Permission.create({id: 3, name: "update"});
  Permission.create({id:4, name: "delete"});

};

function initial() {
  Role.create({
    id: 1,
    name: "superadmin"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
 
  Role.create({
    id: 3,
    name: "staff"
  });
}

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to derricks website." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});