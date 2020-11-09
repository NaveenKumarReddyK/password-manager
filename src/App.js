import { BrowserRouter, Route } from 'react-router-dom';
// import MainPage from './Components/Main-Page';
import Login_Component from './Components/Login';
import Register_Component from './Components/Register';
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/pwd" component={Login_Component} />
      <Route path="/pwd/login" component={Login_Component} />
      <Route path="/pwd/signup" component={Register_Component} />
      <Route path="/pwd/user" component={Dashboard}></Route>
    </BrowserRouter>
  );
}

export default App;
