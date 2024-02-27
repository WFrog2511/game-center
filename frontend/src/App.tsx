import React from 'react';
import DrawingCanvas from './components/DrawingCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DrawingCanvas websocketUrl='ws://localhost:8080/ws' width={800} height={600}></DrawingCanvas>
      </header>
    </div>
  );
}

export default App;
