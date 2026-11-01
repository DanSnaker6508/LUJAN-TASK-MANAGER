const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Servidor LUJAN TASK MANAGER funcionando");
});

const taskRoutes = require("./routes/taskRoutes");

const authRoutes = require("./routes/authRoutes");

app.use("/api", taskRoutes);

app.use("/api", authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});