import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import transporter from "./config/mailer.config.js";

import invoiceRoutes from "./routes/invoices.js";
import clientRoutes from "./routes/clients.js";
import userRoutes from "./routes/userRoutes.js";
import pdfRoutes from "./routes/pdf.js";
import profile from "./routes/profile.js";

const app = express();

dotenv.config();
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", pdfRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/clients", clientRoutes);
app.use("/users", userRoutes);
app.use("/profiles", profile);


transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take messages");
    }
});



const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
