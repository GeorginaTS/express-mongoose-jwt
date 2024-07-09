import usersModel from "../models/collections/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SecretToken = process.env.TOKEN_SECRET;

export const getAllUsers = async (request, response) => {
  try {
    const data = await usersModel.find({});
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send("error en getAll");
  }
};

export const createUser = async (request, response) => {
  try {
    let user = request.body
    const saltRounds = 10;
    await bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, async function(err, hash) {
            user.password = hash
            const data = await usersModel.create(user);
            response.status(201).json({ msg: "User created", data, hash });
        });
    });
  } catch (error) {
    response.status(500).send({msg:"error creating user", error});
  }
};

export const getOneUser = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await usersModel.findById(id);
    data
      ? response.status(200).json({ msg: "Get 1 user", data })
      : response.status(404).json({ msg: "User Not found", id });
  } catch (error) {
    response.status(500).send("Error getting user");
  }
};

export const deleteOneUser = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await usersModel.findByIdAndDelete(id);
    data
      ? response.status(200).json({ msg: "Delete 1 user", id, data })
      : response.status(404).json({ msg: "User Not found", id });
  } catch (error) {
    response.status(500).send({msg:"Error deleting user", error});
  }
};
export const updateOneUser = async (request, response) => {
  try {
    const { id } = request.params;
    let user = request.body
    const saltRounds = 10;
    await bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, async function(err, hash) {
            user.password = hash
            const options = { new: true };
            const data = await usersModel.findByIdAndUpdate(id, user);
            data? response.status(200).json({ msg: "Update  1 user", id, user })
              : response.status(404).json({ msg: "User Not found", id, user });
        });
    });
 
  } catch (error) {
    response.status(500).send({msg:"Error updating user", error});
  }
};

export const loginUser = async (request, response) => {
  try {
    const { body } = request;
    const inputPassword = body.password

    const user = await usersModel.findOne({
      email: body.email
    });
  

    if (user) {
      const hashPassword = user.password
      bcrypt.compare(inputPassword, hashPassword, (err, result) => {
        if (err) {
            response.status(404).json({ msg: "Error bcrypt.compare", hashPassword, inputPassword });
        }
    
    if (result) {
        const token = jwt.sign({ user }, SecretToken, { expiresIn: "3600s" });
        response
          .status(200)
          .json({ msg: `Login OK . Token created ${user.name}`, token, user });
        //response.status(200).redirect("auth")
    } else {
        response.status(404).json({ msg: "Password not correct", user, inputPassword });
    }
    });
      

    } else {
      response.status(404).json({ msg: "User not found", body });
    }
  } catch (error) {
    response.status(500).send("Error loginUser user", request.body);
  }
};

// AUTH PART

export const userPage = async (request, response) => {
  try {
    // Recibe el token mediante el header authorization
    const authHeader = request.headers["authorization"];
    // obtiene el token
    const token = authHeader && authHeader.split(" ")[1];

    // Se valida que el token sea enviado en caso contrario manda un error
    if (token == null) return res.status(401).send({ msg: "No token" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      // VERIFICAMOS QUE EL TOKEN COINCIDA CON LA CONTRASENA
      if (err) return res.status(403).send({ msg: "Token invalid" });
      //request.token = user;
      response.status(200).json({ msg: "user Auth Page", data: user.user });
    });
    
  } catch (error) {
    response.status(500).json({msg:"User Page:Error getting user", token});
  }
};
