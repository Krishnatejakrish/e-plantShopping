import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello krishna how are you");
});
app.use("/api/products", router);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "productStore", "dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "productStore", "dist", "index.html"));
  // });
  app.use(express.static(path.join(__dirname, "productStore", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "productStore", "dist", "index.html"));
});
console.log("Serving static files from:", path.join(__dirname, "productStore", "dist"));

}

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
