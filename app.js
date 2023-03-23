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
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);

    const method = request.method
    const url = request.url
    const currentDate = new Date().toUTCString()
    console.log(`${currentDate} - ${method} - ${url}`)
    let body
    switch(url) {
        // GET http://localhost:8888/users
        case '/users':
            if (method === 'GET') {
                response.end(JSON.stringify(users));
            }
            break
        // POST http://localhost:8888/user
        case '/user':
            if (method === 'POST') {
                body = await bodyParser(request)
                users.push(body)
                response.end(JSON.stringify(body));
                break;
            }
            break;
        case url.match(/\/user\/\d+/)?.input :
            switch (method){
                // GET http://localhost:8888/user/1
                case 'GET':
                    response.end(JSON.stringify(users[0]));
                    break;
                // PUT http://localhost:8888/user/1
                case 'PUT':
                    body = await bodyParser(request)
                    users[0] = body
                    response.end(JSON.stringify(body));
                    break;
                // DELETE http://localhost:8888/user/1
                case 'DELETE':
                    users.pop()
                    response.end('deleted');
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