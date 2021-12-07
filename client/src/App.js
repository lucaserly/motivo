import './App.css';
import { Expenses } from './containers';
import { Header } from './components';

function App() {
  return (
    <div
      className='App'
      style={{
        margin: '20px 30px 0 30px',
      }}
    >
      <Header />
      <Expenses />
    </div>
  );
}

export default App;
