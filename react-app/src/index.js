import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ModalProvider, Modal } from "./context/Modal"
import configureStore from "./store"
import * as sessionActions from "./store/session"
import App from "./App"
import "./index.css"
import { SubdomainProvider } from "./context/Subdomain"

const store = configureStore()

if (process.env.NODE_ENV !== "production") {
	window.store = store
	window.sessionActions = sessionActions
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:

function Root() {
	return (
		<SubdomainProvider>
			<ModalProvider>
				<Provider store={store}>
					<BrowserRouter>
						<App />
						<Modal />
					</BrowserRouter>
				</Provider>
			</ModalProvider>
		</SubdomainProvider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
)
