class WebSocketService {
    private socket: WebSocket | null = null;
  
    connect(url: string) {
        this.socket = new WebSocket(url);
    
        this.socket.onopen = () => {
            console.log('WebSocket Connected');
        };
    
        this.socket.onmessage = (event) => {
            console.log('Message from server ', event.data);
        };
    
        this.socket.onclose = () => {
            console.log('WebSocket Disconnected');
        };
    
        this.socket.onerror = (error) => {
            console.error('WebSocket Error ', error);
        };
    }
  
    safeSend(message: string) {
        if (websocketService.socket && websocketService.socket.readyState === WebSocket.OPEN) {
            websocketService.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent:', message);
        }
    }

    send(data: string) {
        if (!this.socket) {
            console.error('WebSocket is not connected.');
            return;
        }
    
        this.socket.send(data);
    }
}

export const websocketService = new WebSocketService();
  