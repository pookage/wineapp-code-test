import React from "react";
import { RouterProvider } from "CONTEXTS/Router.jsx";
import HelloWorld from "COMPONENTS/HelloWorld/HelloWorld.jsx";

export default function App(props){

	return(
		<RouterProvider>
			<HelloWorld />
		</RouterProvider>
	);
}//App