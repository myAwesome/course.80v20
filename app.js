console.clear()
console.log(`SIMPLE NODE JS SERVER http://localhost:8888\n`)
const http = require('http')

const users = [
    {
        id: 1,
        name: "Vova",
        age: 33,
        hobby: 'tennis'
    }
]

const routing = async (request, response) => {
    const method = request.method
    const url = request.url
    const currentDate = new Date().toUTCString()
    console.log(`${currentDate} - ${method} - ${url}`)
    let body
    switch(url) {

        case '/users':
            if (method === 'GET') {
                response.setHeader("Content-Type", "application/json");
                response.writeHead(200);
                response.end(JSON.stringify(users));
            }
            break
        case '/user':
            switch (method){
                case 'GET':
                    response.setHeader("Content-Type", "application/json");
                    response.writeHead(200);
                    response.end(JSON.stringify(users[0]));
                    break;
                case 'POST':
                    // todo: створення юзера
                    body = await bodyParser(request)
                    users.push(body)
                    response.setHeader("Content-Type", "application/json");
                    response.writeHead(200);
                    response.end(JSON.stringify(body));
                    break;
                case 'PUT':
                    body = await bodyParser(request)
                    users[0] = body
                    response.setHeader("Content-Type", "application/json");
                    response.writeHead(200);
                    response.end(JSON.stringify(body));
                    break;
                case 'DELETE':
                    users.pop()
                    response.setHeader("Content-Type", "application/json");
                    response.end('deleted');

                    break;
            }
            break;
        case '/tasks':
            switch (method){
                case 'GET':
                    response.end(`tasks GET`);
                    break;
                case 'POST':
                    response.end(`tasks POST`);
                    break;
                case 'PUT':
                    response.end(`tasks PUT`);
                    break;
                case 'DELETE':
                    response.end(`tasks DELETE`);
                    break;
            }
            break;
        default:
            response.writeHead(404);
            response.end('not found');
    }

}

http.createServer(routing).listen(8888);
const bodyParser = (request) =>{
    return new Promise((resolve, reject)=>{
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(JSON.parse(body))
        });
    })
}