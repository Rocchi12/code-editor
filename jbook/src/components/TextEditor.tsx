import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import "./TextEditor.css"


interface TextEditorProps {
  cell: Cell,


}
const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing]  = useState(true)

  const {updateCell} = useActions();


  useEffect(()=> {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)){
        return
      }
      setEditing(false)


    }
    document.addEventListener('click', listener, {capture: true})

    return () => {
      document.removeEventListener('click', listener, {capture: true})
    }
  },[])
  if (editing){
    return(
      <div className= "text-editor"ref = {ref}>
      < MDEditor value={cell.content} onChange={(str)=>(updateCell(cell.id, str || "Click to edit"))}/>
      </div>
    )
  }
  return(
  <div onClick={()=>{setEditing(true)}} className="text-editor card">
    <div className="card-content">
      <MDEditor.Markdown source={cell.content} />
    </div>

  </div>
  )
}

export default TextEditor