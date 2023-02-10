import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { Provider } from 'react-redux';
import { store } from './state'
import CellList from './components/CellList';

const App = () => {
  return (
    <Provider store={store}>
    <div>
      {/* <CodeCell/> */}
      {/* <TextEditor/> */}
      <CellList />
    </div>
    </Provider>
    )
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)
