import './App.css';
import { ExpensesList } from './components/';
import { useFetch } from './custom_hooks/useFetch';
import { isDev } from './helpers';
const DATA_URL = isDev() ? 'http://localhost:5001/expenses' : '/expenses';
const GREETING_URL = isDev() ? 'http://localhost:5001/greeting' : '/greeting';

function App() {
  const { response } = useFetch(DATA_URL);
  const { response: greeting } = useFetch(GREETING_URL);

  return (
    <div className='App'>
      <div
        style={{
          margin: '20px 30px 0 30px',
        }}
      >
        <header
          style={{
            marginBottom: '20px',
          }}
        >
          <p>{greeting && greeting.message}</p>
          <p>expense_tracker_by_erl_2</p>
        </header>
        <ExpensesList expenses={response} />
      </div>
    </div>
  );
}

export default App;
