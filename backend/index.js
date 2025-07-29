import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
	res.json({ message: "Привет из backend!" });
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
