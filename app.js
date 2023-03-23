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

    const method = request.method
    const url = request.url
    const currentDate = new Date()
    console.log(`${currentDate} - ${method} - ${url}`)
    let body
    switch(url) {
        case '/users':
            if (method === 'GET') {
                response.end(JSON.stringify(users));
            } else {
                response.writeHead(404);
                response.end('not found');
            }
            break
        case '/user':
            if (method === 'POST') {
                body = await bodyParser(request)
                users.push(body)
                response.end(JSON.stringify(body));
                break;
            }
            break;
        case url.match(/\/user\/\d+/)?.input:
            const myRegexp = /\/user\/(\d)+/g;
            const matches = myRegexp.exec(url);
            const id = matches[1]
            let userIndex
            let [user] = users.filter((u,index)=>{
                if ( u.id == id){
                    userIndex = index
                    return true
                } else{
                    return false
                }
            })
            switch (method){
                case 'GET':
                    if (user) {
                        response.end(JSON.stringify(user));
                    } else {
                        response.writeHead(404);
                        response.end('not found');
                    }
                    break;
                case 'PUT':
                    if (user) {
                        body = await bodyParser(request)
                        users[userIndex] = body
                        response.end(JSON.stringify(user));
                    } else {
                        response.writeHead(404);
                        response.end('not found');
                    }

                    break;
                case 'DELETE':
                    if (user) {
                        delete users[userIndex]
                        response.end('deleted');

                    } else {
                        response.writeHead(404);
                        response.end('not found');
                    }
                    break;
            }
            break;
        default:
            response.writeHead(404);
            response.end('not found');
    }
}

http.createServer(routing).listen(8888);


// функція читає json body з методів POST i PUT
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