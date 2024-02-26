# Node.jsのイメージを指定
FROM node:14

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
