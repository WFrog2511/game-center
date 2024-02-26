package main

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // 本番環境ではセキュリティを考慮してください
	},
}

var connections = make([]*websocket.Conn, 0)
var lock sync.Mutex

func main() {
	r := gin.Default()

	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	r.Run(":8080")
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}

	lock.Lock()
	connections = append(connections, conn)
	lock.Unlock()

	defer func() {
		conn.Close()
		lock.Lock()
		for i, c := range connections {
			if c == conn {
				connections = append(connections[:i], connections[i+1:]...)
				break
			}
		}
		lock.Unlock()
	}()

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		lock.Lock()
		for _, c := range connections {
			if err := c.WriteMessage(mt, message); err != nil {
				// エラーハンドリング
			}
		}
		lock.Unlock()
	}
}
