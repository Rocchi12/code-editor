import './Resizable.css'
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { InferencePriority } from 'typescript';

interface ResizableProps{
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;

}

const Resizable:React.FC<ResizableProps> = ({direction, children}) => {
  let resizableProps: ResizableBoxProps;

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setinnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth*0.9);

  useEffect(()=> {
    let timer:any;
    const listener = () => {
      if (timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setinnerHeight(window.innerHeight);
        if (window.innerWidth*0.75 < width){
          setWidth(window.innerWidth*0.75)
        }

      }, 100);
    };
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  },[])

  if (direction === "horizontal"){
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints:[innerWidth*0.95, Infinity],
      minConstraints:[10, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      onResizeStop: (e, data) => {
        setWidth(data.size.width)
      }
    }
  } else {
    resizableProps = {
      maxConstraints:[Infinity, innerHeight* 0.9],
      minConstraints:[Infinity, 24],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    }
  }
  return <ResizableBox {...resizableProps}>

  {children}
  </ResizableBox>
};

export default Resizable;