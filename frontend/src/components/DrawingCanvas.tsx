import React, { useRef, useEffect, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type DrawingCanvasProps = {
  websocketUrl: string;
  width: number;
  height: number;
};

export const DrawingCanvas: React.FC<DrawingCanvasProps> = (props: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [color, setColor] = useState<string>('#000000');

  const drawLine = (context: CanvasRenderingContext2D, fromPos: Position, toPos: Position, color: string) => {
    // console.log("drawLine: ", fromPos.x, fromPos.y, toPos.x, toPos.y);
    context.beginPath();
    context.moveTo(fromPos.x, fromPos.y);
    context.lineTo(toPos.x, toPos.y);
    context.stroke();
    context.strokeStyle = color;
    context.closePath();
  }

  const getContext = (): CanvasRenderingContext2D|null => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d'): null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas ? canvas.getContext('2d'): null;
    if (!context) return;

    // キャンバス上で右クリックしてもコンテキストメニューが表示されないようにする
    if (canvas) {
      canvas.oncontextmenu = () => {
        return false;
      };
    }

    // WebSocketサーバーへの接続を開始
    if(!ws){
      const _ws = new WebSocket(props.websocketUrl);
      _ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.fromX !== undefined && context) {
          const fromPos = { x: message.fromX, y: message.fromY };
          const toPos = { x: message.toX, y: message.toY };
          drawLine(context, fromPos, toPos, message.color);
        }
      };

      setWs(_ws);
    }
  }, []);

  // 描画開始(マウスをクリックし始めた時の処理)
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if(event.button === 0){ // 左クリック
      setColor('#000000');
    }else if(event.button === 2){ // 右クリック
      setColor('#ffffff');
    }else{
      return;
    }
    
    setIsDrawing(true);
    setPosition({ x: event.clientX, y: event.clientY });
  };
  
  // 描画停止(マウスをクリックし終わった時の処理)
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 描画(マウスを動かしている間の処理)
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    // 描画処理(ローカル)
    const context = getContext();
    if(!context) return;
    const fromPos = { x: position.x, y: position.y };
    const toPos = { x: event.clientX, y: event.clientY };
    drawLine(context, fromPos, toPos, color);
    setPosition(toPos);

    // WebSocketを通じて描画データをサーバーに送信
    if (ws && ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify({
        fromX: position.x,
        fromY: position.y,
        toX: event.clientX,
        toY: event.clientY,
        color: color
      }));
    }
  };

  return (
    <canvas 
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={draw}
      ref={canvasRef} 
      width={props.width} 
      height={props.height}
      style={{ border: '2px solid #000' }} 
    />
  );

};
