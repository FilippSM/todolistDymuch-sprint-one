import './App.css';
import { AppOne } from './Components/AppOne';
import { AppPre } from './Components/AppPre';
import { AppThree } from './Components/AppThree';
import { AppTwo } from './Components/AppTwo';
import { AppTwo_1 } from './Components/AppTwo_1';
import { AppTwo_2 } from './Components/AppTwo_2';


function App() {
  return (
    <div className="App">
      <AppPre/>
      <AppOne/>
      <p>Todolist функции внутри компоненты</p>
      <AppTwo_1/>
      <p>Todolist input и button вынесены в отдельные компоненты</p>
      <AppTwo_2/>
      <p>Todolist функции вынесены из компоненты</p>
      <AppTwo/>
      <AppThree/>
    </div>
  );
}

export default App;
