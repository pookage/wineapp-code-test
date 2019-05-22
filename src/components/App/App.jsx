import React from "react";
import { ClientProvider } from "CONTEXTS/Client.jsx";
import { RouterProvider } from "CONTEXTS/Router.jsx";
import { WineProvider } from "CONTEXTS/Wine.jsx";
import PageSwapper from "COMPONENTS/PageSwapper/PageSwapper.jsx";
import WineList from "COMPONENTS/WineList/WineList.jsx";
import WineDetails from "COMPONENTS/WineDetails/WineDetails.jsx";
import "SHARED/global.scss";
import "SHARED/fonts.scss";
import "SHARED/colours.scss";
import "SHARED/animations.scss";

export default function App(props){

	return(
		<ClientProvider>
			<WineProvider>
				<RouterProvider>
					<PageSwapper id="list" direction="left">
						<WineList />
					</PageSwapper>
					<PageSwapper id="details" direction="right">
						<WineDetails />
					</PageSwapper>
				</RouterProvider>
			</WineProvider>
		</ClientProvider>
	);
}//App