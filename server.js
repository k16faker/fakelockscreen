const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const port = 8000; //인스턴스 생성시 만들었던 포트번호 기입

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post('/', (req, res) => {
  const command = req.body.lock;

  if (command === 'true') {
    // 전체화면 모드로 전환하는 로직
    const fullscreenElement = document.documentElement;

    if (fullscreenElement.requestFullscreen) {
      fullscreenElement.requestFullscreen();
    } else if (fullscreenElement.mozRequestFullScreen) {
      fullscreenElement.mozRequestFullScreen();
    } else if (fullscreenElement.webkitRequestFullscreen) {
      fullscreenElement.webkitRequestFullscreen();
    } else if (fullscreenElement.msRequestFullscreen) {
      fullscreenElement.msRequestFullscreen();
    }

    console.log('페이지가 전체화면으로 전환되었습니다.')
    res.status(200).send('페이지가 전체화면으로 전환되었습니다.');
  } else {
    res.status(400).send('올바른 명령어를 입력하세요.');
    console.log('올바른 명령어를 입력하세요.')
  }
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});