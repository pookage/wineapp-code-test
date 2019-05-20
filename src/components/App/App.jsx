import React from "react";
import { RouterProvider } from "CONTEXTS/Router.jsx";
import { WineProvider } from "CONTEXTS/Wine.jsx";
import WineList from "COMPONENTS/WineList/WineList.jsx";

export default function App(props){

	return(
		<RouterProvider>
			<WineProvider>
				<WineList />
			</WineProvider>
		</RouterProvider>
	);
}//App