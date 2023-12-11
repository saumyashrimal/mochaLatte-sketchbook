import { MENUITEMS } from '@/contants';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {activeMenuItem, actionItemClick} from '@/slice/menuSlice';

export default function Board() {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(null);
    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
      if(!canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      console.log("actionMenuItem = ", actionMenuItem)
      if(actionMenuItem === MENUITEMS.DOWNLOAD){
        const URL = canvas.toDataURL();
        const anchor = document.createElement('a');
        anchor.href = URL;
        anchor.download = 'sketch.jpg';
        anchor.click();
        console.log("url = ", URL);
      }
      dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch])

    useEffect(() => {
      if(!canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      const changeConfig = () => {
        context.strokeStyle = color;
        context.lineWidth = size;
      }
      changeConfig()
    }, [color, size]);
    
    useLayoutEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x,y) => {
          context.beginPath();
          context.moveTo(x,y);
        }

        const drawLine = (x,y) => {
          context.lineTo(x,y);
          context.stroke();
        }

        const handleMouseDown = (e) => {
          shouldDraw.current = true;
          beginPath(e.clientX, e.clientY);
        }

        const handleMouseMove = (e) => {
          if(!shouldDraw.current) return;
          drawLine(e.clientX,e.clientY);
        }

        const handleMouseUp = (e) => {
          shouldDraw.current = false;
        }
        
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
    }, []);
  return (
    <canvas ref={canvasRef} ></canvas>
  )
}
