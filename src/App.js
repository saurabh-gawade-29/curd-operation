import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Table from './components/FamilyTable';
import TableNew from './components/FamilyTableNew';

function App() {
  return (
    <div className="App">
      <Dashboard />
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
            <Table />
          </div>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
            <TableNew />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
