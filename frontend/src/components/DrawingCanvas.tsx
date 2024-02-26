import React, { useRef, useEffect, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    // WebSocketサーバーへの接続を開始
    if(!ws){
      const _ws = new WebSocket('ws://localhost:8080/ws');
      _ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.fromX !== undefined && context) {
          console.log("onmessage: ", message);
          drawLine(context, message.fromX, message.fromY, message.toX, message.toY);
        }
      };
      setWs(_ws);
    }

    function drawLine(context: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) {
      console.log("drawLine: ", fromX, fromY, toX, toY);
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
      context.closePath();
    }


    if (!canvas || !context) return;

    const startDrawing = (event: MouseEvent) => {
      setIsDrawing(true);
      setPosition({ x: event.offsetX, y: event.offsetY });
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;

      context.beginPath();
      context.moveTo(position.x, position.y);
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();

      // WebSocketを通じて描画データをサーバーに送信
      if (ws && ws.readyState === WebSocket.OPEN){
        ws.send(JSON.stringify({
          fromX: position.x,
          fromY: position.y,
          toX: event.offsetX,
          toY: event.offsetY,
        }));
      }
      
      setPosition({ x: event.offsetX, y: event.offsetY });
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, position]);

  return <canvas ref={canvasRef} width="800" height="600" style={{ border: '1px solid #000' }} />;
};

export default DrawingCanvas;
