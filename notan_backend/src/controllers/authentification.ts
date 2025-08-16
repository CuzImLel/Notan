import { createUser, getUserByEmail, getUserBySessionToken } from "../db/users";
import express from "express";
import { authentification, random } from "../helpers/";
export const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res
        .status(400)
        .json({ message: "An user with this email already exists!" });
      return;
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentification: {
        salt,
        password: authentification(salt, password),
      },
    });

    res.status(200).json({
      message: "User registered successfully",
      user: { email: user.email, username: user.username },
    });
    return;
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const user = await getUserByEmail(email).select(
      "+authentification.salt +authentification.password"
    );

    if (!user) {
      res.status(400).json({
        message: "Could not find any matching user with this email!",
      });
      return;
    }

    const expectedHash = authentification(user.authentification.salt, password);
    if (user.authentification.password !== expectedHash) {
      res.status(403).json({ message: "Invalid email or password" });
      return;
    }

    const salt = random();
    user.authentification.sessionToken = authentification(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("Notan-Auth", user.authentification.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json({ message: "Login successful", user });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

export const getUserInformation = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const token = req.cookies["Notan-Auth"];
    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    const user = await getUserBySessionToken(token);
    if (!user) {
      res.status(403).json({ message: "Invalid session" });
      return;
    }
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
    return;
  }
};
