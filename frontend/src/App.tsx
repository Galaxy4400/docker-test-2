import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Message {
	text: string;
	owner: boolean;
}

function App() {
	const [inputMessage, setInputMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const socketRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket(`http://${window.location.hostname}:3001`);

		socketRef.current = socket;

		socket.onmessage = (event) => {
			setMessages((prev) => [...prev, { text: event.data, owner: false }]);
		};

		socket.onopen = () => console.log("✅ WebSocket подключён");
		socket.onerror = (err) => console.error("❌ WebSocket ошибка:", err);
		socket.onclose = () => console.log("🔌 WebSocket отключён");

		return () => {
			socket.close();
			socketRef.current = null;
		};
	}, []);

	const sendHandler = () => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(inputMessage);
			setMessages((prev) => [...prev, { text: inputMessage, owner: true }]);
			setInputMessage("");
		}
	};

	return (
		<div>
			<ul>
				{messages.map((message, i) => (
					<li style={{ color: message.owner ? "green" : "white" }} key={i}>
						{message.text}
					</li>
				))}
			</ul>
			<div>
				<input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
				<button onClick={sendHandler}>Отправить</button>
			</div>
		</div>
	);
}

export default App;
