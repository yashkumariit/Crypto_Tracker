import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './Header';
import Homepage from './Homepage';
import CoinPage from './CoinPage';
import {makeStyles} from '@material-ui/core'


function App() {

  // const useStyles=makeStyles(()=>{


  // })

  return (
    <BrowserRouter>
    <div className='App'>
      <Header/>
      <Routes>
      <Route path='/' element={<Homepage/>}   />
      <Route  path='/coins/:id' element={<CoinPage/>}  />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
