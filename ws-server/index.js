const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

console.log("WebSocket сервер запущен на порту 3001");

wss.on("connection", (ws) => {
	console.log("Новое соединение");

	ws.on("message", (message) => {
		console.log("Получено сообщение:", message.toString());

		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message.toString());
			}
		});
	});

	ws.on("close", () => {
		console.log("Клиент отключился");
	});
});
