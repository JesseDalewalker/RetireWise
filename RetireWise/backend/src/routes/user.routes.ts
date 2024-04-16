import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
import mongoSanitize from "express-mongo-sanitize";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
export const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(mongoSanitize());

//GET ALL users
userRouter.get("/", async (_req, res) => {
  try {
    const user = await collections.user.find({}).toArray();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET ONE user BY ID
userRouter.get("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }

      const query = { _id: new mongodb.ObjectId(id) };
      const user = await collections.user.findOne(query);
      if (user) {
          res.status(200).send(user);
      } else {
          res.sendStatus(404);
      }
  } catch (error) {
      res.sendStatus(404);
  }
});

//POST (CREATE) ONE NEW user
userRouter.post("/", async (req, res) => {
  try {
    const user = req.body;

    // Check if the email already exists in the database
    const existingUser = await collections.user.findOne({ email: user.email });
    if (existingUser) {
      return res.status(409).send("Email already exists.");
    }

    // Hash the user's password using bcrypt, 10 is the number of salt rounds
    const hashedPassword = await bcrypt.hash(user.password, 10); 
    // Replace the original password with the hashed password
    user.password = hashedPassword;
    const result = await collections.user.insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ status: 201, message: "User created successfully." }); 
    } else {
      res.status(500).json({ status: 500, message: "Failed to create a new user." });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// POST route for user login
userRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Retrieve user from the database by email
      const user = await collections.user.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Verify password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // If credentials are correct, generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  
      res.status(200).json({ status: 200, message: "Login successful.", token });
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
});
  
// POST route for token validation
userRouter.post("/validate", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is missing.", status: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token.", status: false });
      }

      const queryFilter = { _id: new mongodb.ObjectId(decoded.userId) };

      const userCount = await collections.user.countDocuments(queryFilter);

      if (userCount != 1) {
        return res.status(401).json({ message: "Fake JWT token.", status: false });
      }

      return res.status(200).json({ message: "Token is valid.", status: true });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", status: false });
  }
});

//PUT (UPDATE) ONE user BY ID
userRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }

      const user = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.user.updateOne(query, { $set: user });

      if (result?.matchedCount) {
          res.sendStatus(200);
      } else if (!result.matchedCount) {
          res.sendStatus(404);
      } else {
          res.sendStatus(304);
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
});

//DELETE ONE user
userRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }

      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.user.deleteOne(query);

      if (result?.deletedCount) {
          res.sendStatus(202);
      } else if (!result) {
          res.sendStatus(400);
      } else if (!result.deletedCount) {
          res.sendStatus(404);
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
});