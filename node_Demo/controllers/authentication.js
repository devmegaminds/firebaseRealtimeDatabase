const router = require('express').Router();
const bodyParser = require('body-parser');
let countryList = require('../CountryList.json');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
var dbAuthentication = require('../dboperations/authentication');
// let commonFunctions = require('../utility/common.constraint');
var mysql = require("mysql")
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CFvgbhnj12#",
    // server: "",//192.168.5.10
    database: "RD_DEMO",
    insecureAuth: true
});
// middelware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// defaults router
router.all(
    '/',
    function (req, res) {
        return res.json({
            status: true,
            message: 'Authentication controller working...'
        })
    }
)

//#region middleware to check headers of api before api call
router.use((request, response, next) => {
    // if (request.headers[process.env.API_CUSTOM_HEADER_KEY] == undefined) {
    //     return response.status(405).json('Api Key was not provided');
    // }
    // else if (request.headers[process.env.API_CUSTOM_HEADER_KEY] != process.env.API_CUSTOM_HEADER_VALUE) {
    //     return response.status(405).json('Api Key is not valid');
    // }
    next();
})
//#endregion middleware to check headers of api before api call


/**
 * @swagger
 * /api/Authentication/CountryList:
 *      get:
 *          tags: 
 *              - Get contries code
 *          description: contries code
 *          parameters:
 *          responses:
 *              200:
 *                  description: Success
 */
// get country list
router.get(
    '/CountryList',
    function (req, res) {
        try {
            return res.json(countryList);
        }
        catch (error) {
            console.log(error);
        }
        // dbAuthentication.getContriesCode()
        // .then(result => {
        //     console.log(result, ">>>>>>");
        // return res.json(result);
        // })
        // .catch((error) => console.log(error));
    }
)
/**
 * @swagger
 * /api/Authentication/FetchUser:
 *      get:
 *          tags: 
 *              - Manage user
 *          description: Manage User
 *          parameters:     
 *          responses:
 *              200:
 *                  description: Success
 */
// fatch tags 
router.get(
    '/FetchUser',
    // commonFunctions.ensureToken,
    function (req, res) {
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("SELECT * FROM Demo_Table;", function (err, result) {
                if (result) {
                    console.log("Result: " + result);
                    var response = {
                        data: result,
                        statusCode: 200,
                        status: 'Success',
                        messgae: 'Get tags successfully.'
                    }
                    return res.status(200).json(response);;
                } else {
                    response = {
                        statusCode: 400,
                        status: 'Error',
                        errorMessage: 'An error occured.'
                    }
                    res.status(400).json(response);

                }
            });
        });
        //    dbAuthentication.GetUserData(req)
        //         .then(result => {
        //             console.log(result,"858585858");
        //             if (result)  {
        //                 var response = {    
        //                     data: result,
        //                     statusCode: 200,
        //                     status: 'Success',
        //                     messgae: 'Get tags successfully.'
        //                 }
        //                 res.status(200).json(response);
        //             }
        //             else if(result != undefined) {
        //                 response = {
        //                     statusCode: 400,
        //                     status: 'Error',
        //                     errorMessage: 'An error occured.'
        //                 }
        //                 res.status(400).json(response);
        //             }
        //         })
        //         .catch((error) => console.log(error));
    }
)

module.exports = router;