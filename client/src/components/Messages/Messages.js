import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages({ messages }) {
	return (
		<div className="message">
			{messages.map((item) => {
				return <h2>{`${item.name}::${item.message}`}</h2>;
			})}
		</div>
	);
}
