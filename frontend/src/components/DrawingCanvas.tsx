import React, { useRef, useEffect, useState } from 'react';
import { websocketService } from '../services/websocketService';

interface Position {
  x: number;
  y: number;
}

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    // WebSocketサーバーへの接続を開始
    websocketService.connect('ws://localhost:8080/ws');

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

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
      websocketService.send(JSON.stringify({
        fromX: position.x,
        fromY: position.y,
        toX: event.offsetX,
        toY: event.offsetY,
      }));

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
