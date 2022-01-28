const sendGrid = require('@sendgrid/mail')
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const { createPool } = require("mysql")
const http = require('http');

const hostname = 'localhost';
const port = 4200;

var con = createPool({
    host: "127.0.0.1",
    user: "root",
    password: "CFvgbhnj12#",
   // server: "",//192.168.5.10
    database: "RD_DEMO",
    insecureAuth: true
});

const server = http.createServer((req, res) => {
    con.query("SELECT * FROM Demo_Table;", (err, res) => {
        console.log(res, "<><><><>")
        return console.log(err, "asdasdasd");
    })

});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//#endregion    
