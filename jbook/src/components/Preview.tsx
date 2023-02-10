import './Preview.css'
import { useEffect, useRef } from "react";


interface PreviewProps{
  code:string
  err:string
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root')
        root.innerHTML = ('<div style="color:red;"><h4>RuntimeError</h4>' + err + '</div>')
        console.error(err);
      }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.message);
      })
      window.addEventListener('message', (event) => {
        try{
          eval(event.data);
        } catch(err){
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(()=>{
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50)
    
  }, [code]);
  {/* srcDoc gets src from a string inside the current document*/}
  return (
  <div className="previewWrapper">
    <iframe title="preview"ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
    {err && <div className="previewError">{err}</div>}
  </div>
  )
}


export default Preview;