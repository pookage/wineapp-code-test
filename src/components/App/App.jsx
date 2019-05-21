import React from "react";
import { ClientProvider } from "CONTEXTS/Client.jsx";
import { RouterProvider } from "CONTEXTS/Router.jsx";
import { WineProvider } from "CONTEXTS/Wine.jsx";
import WineList from "COMPONENTS/WineList/WineList.jsx";
import WineDetails from "COMPONENTS/WineDetails/WineDetails.jsx";
import "SHARED/global.scss";
import "SHARED/fonts.scss";
import "SHARED/colours.scss";
import "SHARED/animations.scss";

export default function App(props){

	return(
		<ClientProvider>
			<RouterProvider>
				<WineProvider>
					<WineList />
					<WineDetails />
				</WineProvider>
			</RouterProvider>
		</ClientProvider>
	);
}//App