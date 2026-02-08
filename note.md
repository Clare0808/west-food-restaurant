初次啟動專案
npm install

啟動 MongoDB Server
cd "C:\Program Files\MongoDB\Server\8.2\bin"
.\mongod.exe --dbpath "C:\mongodb\data\db"

變數順序

1. 官方套件
2. 自定義套件
3. 全域變數

隨機生成 SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Google OAuth 2.0 必要套件安裝
npm install express passport passport-google-oauth20 express-session dotenv
