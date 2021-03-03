import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let socket;

const InfoForm = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		setName("");
		setRoom("");
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</label>
				<br />
				<label>
					Room:
					<input
						type="text"
						value={room}
						onChange={(e) => {
							setRoom(e.target.value);
						}}
					/>
				</label>
				<br />
				<Link
					to={{
						pathname: "/chat",
						state: {
							name,
							room,
						},
					}}
				>
					<input disabled={!room || !name} type="submit" />
				</Link>
			</form>
		</>
	);
};
export default InfoForm;
