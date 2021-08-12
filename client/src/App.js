import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AuthProvider from "./services/context/authContext"
import Homepage from "./scenes/homepage/Homepage"
import Login from "./scenes/login/Login"
import Register from "./scenes/register/Register"
import { store } from "./services/store"
import { Provider } from "react-redux"
import {Link} from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import About from "./scenes/About"
import Contact from "./scenes/Contact"
function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/" exact component={Homepage}></PrivateRoute>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
            </Switch>
          </AuthProvider>
        </Router>
      </Provider>
    </>
  );
}

export default App;
