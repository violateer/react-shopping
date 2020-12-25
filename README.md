## 部署前

+ 在项目根目录添加.env环境变量文件
+ 内容如下
+ ```
  NODE_ENV = development
  PORT = 5000
  MONGO_URI = mongodb://<username>:<password>@<host>:<port>/<dbname>?authSource=<dbname>
  MONGO_DB = <dbname>
  MONGO_USER = <username>
  MONGO_PASS = <password>
  JWT_SECRET = abc123
  PAYPAL_CLIENT_ID = paypal的client id
  ```


