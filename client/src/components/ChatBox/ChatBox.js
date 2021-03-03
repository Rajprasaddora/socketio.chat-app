import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import Message from "../Messages/Messages.js";

let socket;
export default function ChatBox(props) {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	useEffect(() => {
		const { name, room } = props.location.state;

		setName(name);
		setRoom(room);

		socket = io("http://localhost:4000", {
			transports: ["websocket", "polling", "flashsocket"],
		});

		socket.on("message", ({ name, message }) => {
			setMessages((prevMessages) => {
				return [...prevMessages, { name, message }];
			});
		});

		socket.emit("join", { name, room }, () => {});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, []);
	function handleSendMessage(e) {
		e.preventDefault();

		socket.emit("message", { message, name, room });
		setMessage("");
	}
	return (
		<div className="background">
			<div className="container">
				<div className="info-header"></div>
				<div className="messages-box">
					<Message messages={messages} />
				</div>
				<div className="input-field">
					<input
						className="form-input"
						type="text"
						value={message}
						onKeyPress={(e) => {
							if (e.key === "Enter" && message) {
								handleSendMessage(e);
							}
						}}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
					<button
						className="form-button"
						disabled={!message}
						type="submit"
						onClick={handleSendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
