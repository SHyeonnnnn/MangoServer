let http=require('http');
let hostname='127.0.0.1';
let port="8080";

//서버생성(요청: requst, 응답: responsive)
const server=http.createServer(function(req, res){
    const path=req.url;
    const method=req.method;
    if(path==='/products'){
        if(method==='GET'){
            res.writeHead(200,{'Content-Type':'application/json'});
            const products=JSON.stringify([
                {
                    name:"배변패드",
                    price:50000,
                }
            ]);
            res.end(products);
        }else if(method==="POST"){
            res.end("생성되었습니다.")
        }
    }else{res.end('Good Bye')}
})

//서버를 요청 대기 상태로 만든다(port,hostname)
server.listen(port, hostname);
console.log('server on')