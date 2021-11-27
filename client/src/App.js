import './App.css';
import { ExpensesList } from './components/';
import { useFetch } from './custom_hooks/useFetch';
// const URL = 'http://localhost:5002/expenses';
// const URL_2 = 'http://localhost:5002/greeting';
const URL = '/expenses';
const URL_2 = '/greeting';

function App() {
  const { response } = useFetch(URL, {});
  const { response: greeting, isLoading } = useFetch(URL_2, {});
  console.log('-------->response', response)
  console.log('-------->greeting', greeting)
  return (
    <div className='App'>
      <p>test</p>
      <ExpensesList expenses={response} />
      {!isLoading && greeting.message}
    </div>
  );
}

export default App;
