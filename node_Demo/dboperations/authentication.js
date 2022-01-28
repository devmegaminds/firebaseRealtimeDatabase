var config = require('../dbconfig');
const sql = require('mssql');
let countryList = require('../CountryList.json');
// let commonFunctions = require('../utility/common.constraint');
var feelMotiveConnection = config.feelMotiveConnection;
var mysql= require("mysql")

async function getContriesCode() {
    try {
        return countryList;
    }
    catch (error) {
        console.log(error);
    }
}
async function GetUserData() {
    try {
    //     let pool = await sql.connect(feelMotiveConnection);
    //     let result = await pool.request()
    //         .query("SELECT * FROM Demo_Table");
    //     // console.log(result,">>>>>>>>>");
    //     return result;
    // }
    // catch (error) {
    //     console.log(error);
    // }

    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "CFvgbhnj12#",
       // server: "",//192.168.5.10
        database: "RD_DEMO",
        insecureAuth: true
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM Demo_Table;", function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
          return result;
        });
      });



    // con.query("SELECT * FROM Demo_Table;", (err, res) => {
    //     console.log(res, "<><><><>")
    //     return console.log(err, "asdasdasd");
    // })
    // try {
    //     con.query("SELECT * FROM Demo_Table;", (err, res) => {
    //         console.log(res, "<><><><>")
    //     })
    } catch (error) {
        console.log(error);
    }
}


//#region 

// async function loginWithMobile(mobileNumber) {
//     try {
//         let pool = await sql.connect(feelMotiveConnection);
//         let login = await pool.request()
//             .input('MobileNumber', sql.VarChar, mobileNumber)
//             .input('Otp', sql.Int, commonFunctions.randomNumber(1000, 9999))
//             .execute('sp_LoginWithMobile')

//         return login.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function verifyOTP(reqbody) {
//     try {
//         let pool = await sql.connect(feelMotiveConnection);
//         let otp = await pool.request()
//             .input('inUserId', sql.Int, reqbody.inUserId)
//             .input('Otp', sql.Int, reqbody.OTP)
//             .input('DeviceToken', sql.NVarChar, reqbody.DeviceToken)
//             .execute('sp_VerifyOTP')

//         return otp.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function reSendOTP(reqbody) {
//     try {
//         let pool = await sql.connect(feelMotiveConnection);
//         let otp = await pool.request()
//             .input('stMobileNumber', sql.VarChar, reqbody.stMobileNumber)
//             .input('inUserId', sql.Int, reqbody.inUserId)
//             .input('Otp', sql.Int, commonFunctions.randomNumber(1000, 9999))
//             .execute('sp_ReSendOTP')
//         return otp.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }



// async function login(reqbody) {
//     try {
//         let pool = await sql.connect(feelMotiveConnection);
//         let otp = await pool.request()
//             .input('stEmail', sql.NVarChar, reqbody.stEmail)
//             .input('stPassword', sql.NVarChar, reqbody.stPassword)
//             .execute('sp_AdminLogin')

//         return otp.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }
//#endregion
module.exports = {
    getContriesCode: getContriesCode,
    GetUserData: GetUserData,
}