import "./AddCell.css";
import {useActions} from '../hooks/useActions';

interface AddCellProps {
  previousCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({previousCellId}) => {
  const {insertCellAfter} = useActions();
  return (
    <div className="addCell">
      <div className="addButtons">
      <button onClick={() => insertCellAfter(previousCellId, 'code')}>Code</button>
      <button onClick={() => insertCellAfter(previousCellId, 'text')}>Text</button>
      </div>
      <div className ="divider"></div>
    </div>
  )
}

export default AddCell;