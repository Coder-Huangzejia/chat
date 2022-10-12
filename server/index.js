const io = require("./io");
const { getNetworkIPv4 } = require("./utils");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
app.use("/", express.static("dist"));
app.use("/assets/images", express.static("upload"));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const multer=require('multer');

const upload = multer({dest: './upload'})
app.post('/upload', upload.single('file'),function(req,res,next){
  res.json({
    file:req.file
  })
} )

const PORT = 3000;
io.attach(server);
//启动服务器
server.listen(PORT, () => {
  const address = getNetworkIPv4().address;
  console.info("- Local:   http://localhost:" + PORT);
  console.info(`- Network: http://${address}:` + PORT);
});
