import './CodeEditor.css'
import MonacoEditor, {EditorDidMount, monaco} from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string;
  onChange(value:string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {

    monacoEditor.onDidChangeModelContent(() => {
      editorRef.current = monacoEditor
      onChange(getValue());
    })

    monacoEditor.getModel()?.updateOptions({tabSize: 2});

  }
  const onFormatClick = () => {

    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();


    // format the value

    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    })


    // set the formatted value back in the editor

    editorRef.current.setValue(formatted);

    

  }
  return(
  <div className="editorWrapper">
    <button onClick={onFormatClick} className="button button-format is-primary is-small">Format</button>
    <MonacoEditor 
    editorDidMount={onEditorDidMount}
    value={initialValue}
    height="100%" 
    language="javascript" 
    theme="dark" 
    options= {
      {
      wordWrap: 'on', 
      minimap: {enabled:false}, 
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 2,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,

    }}
    />
  </div>)

}

export default CodeEditor;