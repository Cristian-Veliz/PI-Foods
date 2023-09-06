import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar.jsx';
import Landing from './views/Landing/Landing.jsx';
import Home from './views/Home/Home.jsx';
import Create from './views/Create/Create';
import Detail from './views/Detail/Detail.jsx';
import About from './views/About/About';
import NotFound from './views/NotFound/NotFound';
import DetailDb from './views/DetailDb/DetailDb';



function App() {
  const {pathname} = useLocation();
  return (
    <div className="App">
      {pathname === '/' ? null : <NavBar/>  }
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/create' component={Create}/>
        <Route exact path='/recipes/:id' component={Detail}/>
        <Route exact path='/recipes/db/:id' component={DetailDb} />
        <Route exact path='/about' component={About}/>
        <Route exact path='*' component={NotFound}/>
      </Switch>
      
    </div>
  );
}

export default App;
