import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req: Request, res: Response): Promise<any> => {
	try {
		const { username, email, password, confirmPassword, gender } = req.body;
		if (!username || !password || !confirmPassword || !gender) {
			return res
				.status(400)
				.json({ error: "Please provide all necessary details" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await prisma.user.findFirst({ where: { username, email } });

		if (user?.username === username) {
			return res.status(400).json({ error: "Username already exists" });
		} else if (user?.email === email) {
			return res.status(400).json({ error: "Email already exists" });
		}

		const salt = await bcrypt.genSaltSync(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				gender,
				profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
			},
		});

		if (newUser) {
			generateToken(newUser.id, res);

			res.status(201).json({
				id: newUser.id,
				email: newUser.email,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error: any) {
		console.error("Error in signUp controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req: Request, res: Response): Promise<any> => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) return res.status(400).json({ error: "User doesn't exist" });

		const isPassCorrect = await bcrypt.compare(password, user.password);
		if (!isPassCorrect)
			return res.status(401).json({ error: "Incorrect Password" });

		generateToken(user.id, res);

		res.status(200).json({
			id: user.id,

			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error: any) {
		console.error("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error: any) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const user = await prisma.user.findUnique({ where: { id: req.user?.id } });

		if (!user) return res.status(401).json({ error: "User not found" });

		res.status(200).json({
			id: user.id,
			email: user.email,
			username: user.username,
			geneder: user.gender,
			profilePic: user.profilePic,
		});
	} catch (error: any) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
