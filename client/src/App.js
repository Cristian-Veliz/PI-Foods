import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar.jsx';
import Landing from './views/Landing/Landing.jsx';
import Home from './views/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import Detail from './views/Detail/Detail.jsx';
import About from './views/About/About.jsx';
import NotFound from './views/NotFound/NotFound.jsx';



function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname === '/' ? null : <NavBar/>  }
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/create' component={Form}/>
        <Route exact path='/recipes/:id' component={Detail}/>
        <Route exact path='about' component={About}/>
        <Route exact path='*' component={NotFound}/>
      </Switch>
      
    </div>
  );
}

export default App;
