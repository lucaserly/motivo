import './App.css';
import { ExpensesList } from './components/';
import { useFetch } from './custom_hooks/useFetch';
const URL = 'http://localhost:5002/expenses';

function App() {
  const { response } = useFetch(URL, {});

  return (
    <div className='App'>
      <ExpensesList expenses={response} />
    </div>
  );
}

export default App;
