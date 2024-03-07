import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
export const userRouter = express.Router();
userRouter.use(express.json());


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
      const query = { _id: new mongodb.ObjectId(id) };
      const user = await collections.user.findOne(query);
      if (user) {
          res.status(200).send(user);
      } else {
          res.status(404).send(`Failed to find user ${id}`);
      }
  } catch (error) {
      res.status(404).send(`Failed to find user ${req?.params?.id}`);
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
  
  

//PUT (UPDATE) ONE user BY ID
userRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const user = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.user.updateOne(query, { $set: user });

      if (result && result.matchedCount) {
          res.status(200).send(`Updated user ${id}.`);
      } else if (!result.matchedCount) {
          res.status(404).send(`Failed to find user ${id}`);
      } else {
          res.status(304).send(`Failed to update user ${id}`);
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
});

//DELETE ONE user
userRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.user.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Removed user ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove user ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find user ${id}`);
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
});