import './App.css';
import {Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogCardDetailed from './components/DogCardDetailed/DogCardDetailed';
import CreateDog from './components/CreateDog/CreateDog';

function App() {
  return (
      <div className="App">
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
          <Route path="/details/:id" component={DogCardDetailed} />
          <Route path="/create" component={CreateDog} />
      </div>
  );
}

export default App;
