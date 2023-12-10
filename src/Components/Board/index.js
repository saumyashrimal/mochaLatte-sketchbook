import React, { useEffect, useRef } from 'react'

export default function Board() {
    const canvasRef = useRef(null);
    useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);
  return (
    <canvas ref={canvasRef} ></canvas>
  )
}
