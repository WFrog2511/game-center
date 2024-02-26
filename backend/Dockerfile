# Goの公式イメージをベースとして使用。ここでは1.20を指定します。
FROM golang:1.20

# 作業ディレクトリを設定します。
WORKDIR /app

# 依存関係のファイルをコピーします（存在する場合）。
COPY go.mod ./
COPY go.sum ./

# 依存関係をダウンロードします。
RUN go mod download

# ソースコードをコピーします。
COPY . .

# 開発サーバーを起動するコマンド。必要に応じて変更してください。
CMD ["go", "run", "./main.go"]
