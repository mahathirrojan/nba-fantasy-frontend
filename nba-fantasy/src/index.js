import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client"; 
import { Provider } from 'react-redux';
// import store from './store';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./Components/context/AuthProvider";

const root = createRoot(document.getElementById('root')); 

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <AuthProvider>
        <App />
        </AuthProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
