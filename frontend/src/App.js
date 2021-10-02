import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const hist = createBrowserHistory();

axios.interceptors.request.use(async (config) => {
  if (localStorage.token) {
    config.headers = {
      ...config.headers,
      "Authorization": 'BEARER ' + localStorage.getItem("token")
    }
  }
  return config
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error)
    const { status } = error.response;
    // localStorage.clear();
    // window.location.replace("/login")
    console.log('login')
    return Promise.reject(error);
  }
);
function App() {
  return (
    <>
      <Router history={hist}>
        <ToastContainer
          bodyClassName="toastBody"
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
