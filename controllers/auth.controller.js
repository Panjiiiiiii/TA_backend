const userModel = require("../models/index").user;
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const secret = `user`;

const authenticate = async (req, res) => {
  let dataLogin = {
    email: req.body.email,
    password: req.body.password 
  };

  

  let dataUser = await userModel.findOne({ where: {email : dataLogin.email} });

  if(dataUser == null){
    return res.status(500).json({
      message : `Email or password not match`
    })
  }

  const valid = await bcrypt.compare(dataLogin.password, dataUser.password)

  if (valid) {
    let payLoad = JSON.stringify(dataUser);
    console.log(payLoad);

    let token = jwt.sign(payLoad, secret);

    return res.json({
      succsess: true,
      logged: true,
      message: `Authentication Success`,
      token: token,
      data: dataUser,
    });
  }
  return res.status(500).json({
    succsess: false,
    logged: false,
    message: `Authetication failed`,
  });
};

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    let verifiedUser = jwt.verify(token, secret);
    if (!verifiedUser) {
      return res.json({
        succsess: false,
        auth: false,
        message: `User unauthorized`,
      });
    }

    req.user = verifiedUser;
    next();
  } else {
    return res.status(500).json({
      succsess: false,
      auth: false,
      message: `User unauthorized`,
    });
  }
};

module.exports = { authenticate, authorize };
