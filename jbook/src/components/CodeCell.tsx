import {useEffect} from 'react'
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';
import Resizable from './Resizable';
import {Cell} from '../state';
import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';
import "./CodeCell.css"

interface CodeCellProps {
  cell: Cell,


}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumlativeCode = useTypedSelector((state) => {
    const {data, order}  = state.cells;

    const orderedCells = order.map(id => data[id]);

    const cumlativeCode = [];

    for (let c of orderedCells){
      if (c.type === 'code'){
        cumlativeCode.push(c.content);
      }
      if (c.id == cell.id){
        break;
      }
    }

    return(cumlativeCode);

   })


  // deboucing is when we can to let our code run as much as possible with a timer. then do something with that code when it is done runing
  useEffect (()=> {
    if (!bundle){
      createBundle(cell.id, cumlativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async() => {
      createBundle(cell.id, cumlativeCode.join('\n'))

    },1000)

    return(()=> {
      clearTimeout(timer);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumlativeCode.join('\n'), cell.id, createBundle])



 
  return (
    <Resizable direction="vertical">
    <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
      <Resizable direction="horizontal">

      <CodeEditor initialValue={cell.content} onChange ={(value) => updateCell(cell.id, value)}/>

      </Resizable >
      {
        !bundle || bundle.loading ? <div className='loading'>Loading... </div> : <Preview code={bundle.code} err={bundle.err}/>
      }

    </div>
    </Resizable>
  )
}


export default CodeCell