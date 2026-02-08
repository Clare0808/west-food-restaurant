# 第一步：在 Node 環境中打包 Vue 專案
FROM node:20-alpine AS build

WORKDIR /app

# 複製 package.json 與 package-lock.json，安裝依賴
COPY package*.json ./
RUN npm install


# 複製專案原始碼
COPY . .


# 執行 Vue 打包，生成 dist/ 靜態檔
RUN npm run build


# 第二步：使用 Nginx 提供靜態檔服務
FROM nginx:stable-alpine


# 將打包好的 dist/ 複製到 Nginx 的靜態檔目錄
COPY --from=build /app/dist /usr/share/nginx/html


# 選用：刪掉預設 Nginx 配置並使用自訂配置
COPY nginx.conf /etc/nginx/conf.d/default.conf


# 對外開放 80 port
EXPOSE 80


# 啟動 Nginx，前景執行
CMD ["nginx", "-g", "daemon off;"]