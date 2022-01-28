const { createPool } = require("mysql")

const config = {
    feelMotiveConnection: createPool({
            host: "127.0.0.1",
            user: "root",
            password: "CFvgbhnj12#",
            // server: "",//192.168.5.10
            database: "RD_DEMO",
            insecureAuth: true
        })
}

module.exports = config;

// // //select distinct local_net_address, local_tcp_port from sys.dm_exec_connections where local_net_address is not null
// let mysql = require('mysql');

// let connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "CFvgbhnj12#",
//     // server: "",//192.168.5.10
//     database: "RD_DEMO",
//     insecureAuth: true
// });
// connection.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }

//     console.log('Connected to the MySQL server.');
// });