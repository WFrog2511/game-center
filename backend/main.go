package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// すべてのオリジンを許可する（本番環境ではセキュリティを考慮してください）
		return true
	},
}

func main() {
	r := gin.Default()

	r.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	r.Run(":8080") // デフォルトでは8080ポートでサーバーを起動
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}

	defer conn.Close()

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		// 受信したメッセージを全クライアントにブロードキャスト（ここでは単純化のために同じコネクションに送り返しています）
		if err := conn.WriteMessage(mt, message); err != nil {
			break
		}
	}
}
