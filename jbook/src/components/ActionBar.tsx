import {useActions} from '../hooks/useActions'
import "./ActionBar.css"

interface ActionBarProps {
  id: string;

}

const ActionBar:React.FC<ActionBarProps>  = ({id})=> {
  const {moveCell, deleteCell} = useActions();
  return (
    <div className="actionBar">
      <div className = "cont">
        <button onClick = {() => moveCell(id,'up')}>Up</button>
        <button onClick = {() => moveCell(id, 'down')}>Down</button>
        <button onClick = {() => deleteCell(id)}>Delete</button>
      </div>
    </div>
  )

};

export default ActionBar;