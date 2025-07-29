import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.json({ message: "Привет из backend снова!" });
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на http://localhost:${PORT}`);
});
