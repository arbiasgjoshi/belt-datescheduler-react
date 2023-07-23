import "./App.scss";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomePage from "./components/pages/home";
import AboutPage from "./components/pages/about";
import SchedulePage from "./components/pages/schedule";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = true; // Check if the user is authenticated

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/schedule" component={SchedulePage} />
      <PrivateRoute exact path="/about" component={AboutPage} />
    </Router>
  );
};

const Login = () => {
  return <>Login</>;
};

export default App;
