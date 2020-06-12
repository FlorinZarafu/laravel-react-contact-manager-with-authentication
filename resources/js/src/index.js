import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import RootReducer from "./redux/reducers/RootReducer";
import thunk from "redux-thunk";

// create instance of redux store
const store = createStore(RootReducer, applyMiddleware(thunk));

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );
}
