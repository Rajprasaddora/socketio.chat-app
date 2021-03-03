import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InfoForm from "./components/InfoForm/InfoForm.js";
import ChatBox from "./components/ChatBox/ChatBox.js";

function App() {
	return (
		<>
			<Router>
				<Route path="/" exact component={InfoForm}></Route>
				<Route path="/chat" exact exact component={ChatBox}></Route>
			</Router>
		</>
	);
}

export default App;
