console.clear()
console.log(`\n TESTS`)

const url = '/user/10'

switch(url) {
    case '/user':
        console.log(`\n/USER`)
        break;
    case url.match(/\/user\/\d+/)?.input :
        console.log(`\n MATCHED`)
        break
    default:
        console.log(`\n DEFAULT`)
}