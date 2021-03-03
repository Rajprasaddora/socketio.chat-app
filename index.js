const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = 4000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require("./router.js");

app.use(router);

io.on("connection", (socket) => {
	socket.on("join", ({ name, room }, callback) => {
		socket.emit("message", {
			name: "admin",
			message: "welcome to the room",
		});
		socket.broadcast
			.to(room)
			.emit("message", { name, message: "i have joined this room" });
		socket.join(room);
	});

	socket.on("message", ({ message, name, room }) => {
		socket.emit("message", { name: "admin", message: message });
		socket.broadcast.to(room).emit("message", { name, message });
	});

	socket.on("disconnect", () => {
		console.log("user has left");
	});
});

server.listen(PORT, () => {
	console.log("listening on port ", PORT);
});
