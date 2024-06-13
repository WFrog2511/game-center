# ベースイメージとしてNode.jsを使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのソースコードをコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
