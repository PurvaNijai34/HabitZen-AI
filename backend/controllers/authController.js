import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send JWT in httpOnly cookie

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    user,
  });
};

// Email validation

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strong password validation

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// REGISTER

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      });
    }

    const exists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (exists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const user = await User.create({
      name,

      email: email.toLowerCase(),

      password,

      avatar: name.charAt(0).toUpperCase(),
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// LOGOUT

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,

    expires: new Date(0),
  });

  res.json({
    message: "Logged out successfully",
  });
};

// FORGOT PASSWORD

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "No user found with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire = Date.now() + 1000 * 60 * 15;

    await user.save();

    const resetUrl =
      `${process.env.CLIENT_URL}` + `/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:sans-serif">
        <h2>Reset Your Password</h2>

        <p>You requested a password reset for HabitZen AI.</p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#4f46e5;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:16px">
          This link expires in 15 minutes.
        </p>
      </div>
    `;

    await sendEmail({
      to: user.email,

      subject: "Reset Your Password",

      html,
    });

    res.json({
      message: "Password reset email sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// RESET PASSWORD

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CURRENT USER

export const me = async (req, res) => {
  res.json({
    user: req.user,
  });
};

// UPDATE PROFILE

export const updateProfile = async (req, res) => {
  try {
    const { name, morningMotivation } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name.trim();

      if (name.trim()) {
        user.avatar = name.charAt(0).toUpperCase();
      }
    }

    if (morningMotivation !== undefined) {
      user.morningMotivation = morningMotivation;
    }

    await user.save();

    res.json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
