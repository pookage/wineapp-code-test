import React from "react";
import { RouterProvider } from "CONTEXTS/Router.jsx";
import { WineProvider } from "CONTEXTS/Wine.jsx";
import WineList from "COMPONENTS/WineList/WineList.jsx";
import WineDetails from "COMPONENTS/WineDetails/WineDetails.jsx";
import "SHARED/global.scss";
import "SHARED/fonts.scss";
import "SHARED/colours.scss";

export default function App(props){

	return(
		<RouterProvider>

			<WineProvider>
				<WineList />
				<WineDetails />
			</WineProvider>
		</RouterProvider>
	);
}//App