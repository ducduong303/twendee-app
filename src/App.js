import "./styles/app.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login/Login";
import Context from "./context/Context";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Admin from "./pages/Admin/Admin";
import Users from "./pages/User/Users";


function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Context>
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        {/* <Route path="/admin" component={Admin} />
                        <Route path="/users" component={Users} /> */}
                     
                        <Route path="/admin" render={() => {
                            return localStorage.getItem("token") ? <Admin /> : <Redirect to="/"></Redirect>
                        }} />
                        <Route path="/users" render={() => {
                            return localStorage.getItem("token") ? <Users /> : <Redirect to="/"></Redirect>
                        }} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                    </Context>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
