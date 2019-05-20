import React from "react";
import ReactDOM from "react-dom";
import App from "COMPONENTS/App/App.jsx";

window.addEventListener("DOMContentLoaded", init);

function init(){
	ReactDOM.render(
		<App />,
		document.getElementById("app")
	);
}
