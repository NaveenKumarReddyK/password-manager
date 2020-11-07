import { BrowserRouter, Route} from 'react-router-dom'
import MainPage from './Components/Main-Page'
function App() {
  return (
     <BrowserRouter>
      <Route exact path="/pwd" component={MainPage} />
      <Route path="/pwd/home" component={MainPage} />
     </BrowserRouter>
  );
}

export default App;
