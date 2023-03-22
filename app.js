console.clear()
console.log(`SIMPLE NODE JS SERVER \n`)
const http = require('http')

const users = []



http.createServer(function (request, response) {
    routing(request, response)
}).listen(8888);

const routing = (request, response) => {
    const method = request.method
    const url = request.url
    const currentDate = new Date().toUTCString()
    console.log(`${currentDate} - ${method} - ${url}`)
    switch(url) {
        case 'users':
            if (method === GET) {
                // todo: список юзерів
                users
                // response.end(`users GET`);
            }
            break
        case '/user':
            switch (method){
                case 'GET':
                    // todo: перший  юзер
                    response.end(`users GET`);
                    break;
                case 'POST':
                    // todo: створення юзера
                    response.end(`users POST`);
                    break;
                case 'PUT':
                    // todo: редагування першого юзера
                    response.end(`users PUT`);
                    break;
                case 'DELETE':
                    // todo: видалення першого юзера
                    response.end(`users DELETE`);
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