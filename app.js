const readlineSync = require('readline-sync');
const backup = require('./scripts/backup')
const deleteAll = require('./scripts/deleteAll')
const restore = require('./scripts/restore')
const fs = require('fs');

let config;
try {
    const configString = fs.readFileSync("./config.json")
    config = JSON.parse(configString)
} catch (error) {
    const url = readlineSync.question('Please enter the url: ');
    const dbName = readlineSync.question('Please enter the name of the database: ');
    const dbCollection = readlineSync.question('Please enter the name of the collection: ');

    config = {
        url,
        dbName,
        dbCollection
    }

    console.log("\n")
    console.log("Tip: You can rename config_default.json to config.json and enter the configuration there, then you don't have to enter it manually.\n")
}

console.log('Welcome to MongoDB-tools!\n\n')

console.log('You have the following options:\n')

console.log('1 Delete Documents')
console.log('2 Backup Documents')
console.log('3 Restore Documents\n')

let task = readlineSync.question('Please select (1|2|3):');

console.log('\n\n\n')

switch (task) {
    case '1':
        deleteAll(config);
        break;
    case '2':
        backup(config);
        break;
    case '3':
        restore(config);
        break;

    default:
        console.log("Wrong input!")
        process.exit(1)
        break;
}