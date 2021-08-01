const express = require('express');
const app = express(); // express 객체가 생성 

app.set('PORT', 8000);

/** 
	가장상단에 있는 미들웨어 전용 라우터 
	- 모든 요청에 유입
	
*/
app.use((req, res, next) => {
	console.log("공통 라우터!");
	req.shareData = "공유데이터"; 
	next();
});


// GET - / 라우터 
app.get("/", (req, res) => {
	console.log("/", req.shareData);
	/**
	req - Request 
	res - Response 
		 .send(데이터) - 출력(http모듈 제공 기본 메서드 예) res.write, res.end)
		 .status(상태코드) - (http 모듈 - res.writeHead(상태코드))
	*/
	
	return res.send("<h1>Express에서 출력!</h1>");
});


app.get("/test", (req, res, next) => {
	console.log("/test", req.shareData);
	//return res.send("<h1>테스트 라우터</h1>");
	console.log("0번째 미들웨어");
	next(); // 다음 해당하는 라우터의 첫번째 미들웨어로 이동 
});

app.get("/test", (req, res, next) /* 1번째 미들웨어 */ => {
	console.log("1번째 미들웨어");
	next(); // 다음 미들웨어로 이동
}, (req, res, next) /* 2번째 미들웨어 */  => {
	console.log("2번째 미들웨어");
	next();
}, (req, res) /* 3번째 미들웨어 */ => {
	console.log("3번째 미들웨어");
	
	return res.send("/test 라우터");
});

/** 
 가장 하단에 라우터 - 모든 요청, 모든 메서드 use 
						  - 없는 페이지 처리 라우터 
						  - 상태코드를 404로해서 없는페이지라고 브라우저에 전달 
*/
app.use((req, res, next) => {
	//return res.send("<h1>가장 하단에 있는 모든 요청 처리 라우터</h1>");
	return res.status(404).send("현재 접속한 " + req.url + "은 없는 페이지 입니다...");
});


app.listen(app.get('PORT'), () => {
	console.log(app.get('PORT'), "번 포트에서 서버 대기중...");
});