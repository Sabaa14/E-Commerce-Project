import { Request, Response } from "express";

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const productsRoutes = require("./routes/products.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const categoriesRoutes = require("./routes/categories.routes");
const User = require('./models/user.model')
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import passport config
import passport from "./utils/googleAuth";

// -----------------------------------------------------------------------------
// Middleware & Routes
app.use(express.json());

let whitelist = [
    "http://localhost:3300",
    "https://www.abdelrahman.com",
    "https://localhost:8000",
];
let corsOptions = {
    origin: function (origin: string, callback: any) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback("Not allowed by CORS");
        }
    },
};
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/categories", categoriesRoutes);

// -----------------------------------------------------------------------------
// OAuth with Passport
app.use(passport.initialize());

// Start Google login
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Callback

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req: any, res: any) => {
    try {
      const googleId = req.user.id;
      const email = req.user.emails[0].value;

      let user = await User.findOne({ googleId });
      if (!user) {
        user = await User.create({
          name: req.user.displayName,
          email,
          googleId,
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      console.error("OAuth error:", error);
      res.redirect("/login?error=oauth_failed");
    }
  }
);

// Protected route
app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Access granted", user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// -----------------------------------------------------------------------------
// Error handler
app.use((error: any, req: Request, res: Response, next: any) => {
  console.log("This is the error handling middleware: ", error);
  res.status(500).send("Something went wrong");
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("The server is running on http://localhost:3000");
});

// Server start
app.listen(process.env.PORT, () => {
  connectDB();
  console.log("The server is running on Port : ", process.env.PORT);
});

// Global unhandled rejection
process.on("unhandledRejection", (error: any) => {
  console.error("Unhandled rejection:", error);
  process.exit(1); 
});