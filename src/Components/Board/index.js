import { MENUITEMS } from '@/contants';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {activeMenuItem, actionItemClick} from '@/slice/menuSlice';
import {socket} from '@/socket';

export default function Board() {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(null);
    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem]);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);

    useEffect(() => {
      if(!canvasRef.current) return;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if(actionMenuItem === MENUITEMS.DOWNLOAD){
        const URL = canvas.toDataURL();
        const anchor = document.createElement('a');
        anchor.href = URL;
        anchor.download = 'sketch.jpg';
        anchor.click();
        console.log("url = ", URL);
      } else if(actionMenuItem === MENUITEMS.UNDO || actionMenuItem === MENUITEMS.REDO) {
        if(historyPointer.current > 0 && actionMenuItem === MENUITEMS.UNDO) historyPointer.current -= 1;
        if(historyPointer.current < drawHistory.current.length-1 && actionMenuItem === MENUITEMS.REDO) historyPointer.current += 1;
        const imageData = drawHistory.current[historyPointer.current];
        context.putImageData(imageData,0,0);
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
          socket.emit('beginPath', {x: e.clientX , y: e.clientY});
        }

        const handleMouseMove = (e) => {
          if(!shouldDraw.current) return;
          drawLine(e.clientX,e.clientY);
          socket.emit("drawLine", {x: e.clientX , y: e.clientY});
        }

        const handleMouseUp = (e) => {
          shouldDraw.current = false;
          const imageData = context.getImageData(0,0,canvas.width,canvas.height);
          drawHistory.current.push(imageData);
          historyPointer.current = drawHistory.current.length - 1;
        }
        
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        const handleBeginPath = (path) => {
          beginPath(path.x, path.y);
        }

        const handleDrawLine = (path) => {
          drawLine(path.x,path.y);
        }
        socket.on('connect', () => {
          console.log("connected on client")
        })

        socket.on("beginPath", handleBeginPath);
        socket.on("drawLine", handleDrawLine);


        return () => {
          canvas.removeEventListener('mousedown', handleMouseDown)
          canvas.removeEventListener('mouseup', handleMouseUp)
          canvas.removeEventListener('mousemove', handleMouseMove)
          socket.off("beginPath", handleBeginPath);
          socket.off("drawLine", handleDrawLine);
        }
    }, []);
  return (
    <canvas ref={canvasRef} ></canvas>
  )
}
