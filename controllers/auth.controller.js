const db = require("../config/db.config");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.roles;
const Permission = db.permission;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { roles } = require("../config/db.config");
// const { permission } = require("../config/db.config");
// const User = require("../models/user");

exports.signup = async(req, res) => {
  try {
    

    let u =await User.create(
      {
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        lastname: req.body.lastname,
       
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }
    );
    if(u, req.body.roles) {
     let role =await Role.findAll({where: {id: req.body.roles}});
     let roleStr = JSON.stringify(role);
     let rolepar = JSON.parse(roleStr);
     u.setRoles(role);
    

     if(u, role) {
       let prm = await Permission.findAll();
       let prmStr = JSON.stringify(prm);
       let prmParsed = JSON.parse(prmStr);
      
  

       let crt = await Permission.findAll({where:{id: 1}});
       let vw = await Permission.findAll({where:{id: 2}});
       let upd = await Permission.findAll({where:{id: 3}});
       let del = await Permission.findAll({where:{id: 4}});

       let rolp = Role.findAll();
       let rolpstr = JSON.stringify(rolp);
       let rolpar = JSON.parse(rolpstr);

      for(let i = 0; i < rolpar.length; i++){
        console.log();
        console.log("test");
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(rolpar[i]);
        u.setPermissions = [];
      if(rolpar[i].name === "superadmin")
      {
        u.setPermissions.push(crt, vw, upd, del);

      } else if(rolpar[i].name === "admin")

      {
        u.setPermissions.push([crt, vw, upd]);

      } else if(rolpar[i].name === "staff")

      {
        u.setPermissions.push([crt, vw, upd]);
      }
     }


     }
     res.status(200).json(u);
     

    }
        
  } catch (err) {
    res.status(500).send(err.message);
    
  }

};



exports.signin =async (req, res) => {
  try{
  let si = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if(!si)
  {
    return res.status(404).send({message: "User not found"})
  }
  var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          si.password
        );
        if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
              if (!passwordIsValid) {
                      return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                      });
                    }
              
                    var token = jwt.sign({ id: si.id }, config.secret, {
                      expiresIn: 86400 // 24 hours
                    });
                    var authorities = [];
                       let roles = si.getRoles();
                         let permissions = roles.getPermission();
                         console.log();
                         console.log();
                         console.log()
                         console.log("test");
                         console.log();
                         console.log();
                         console.log(roles);
                         console.log();
                         console.log();
v

                         for (let i = 0; i < roles.length; i++) {
          
                                  authorities.push("ROLE_" + roles[i].name.toUpperCase());
                                }
                                for (let i = 0; i < permissions.length; i++) {
          
                                  authorities.push("PERMISSION_" + permissions[i].name.toUpperCase());
                                }
                                res.status(200).send({
                                  id: si.id,
                                  username: si.username,
                                  email: si.email,
                                  roles: authorities,
                                  accessToken: token
                                });

} catch(err)
{
  res.status(500).send({ message: err.message });
}

};