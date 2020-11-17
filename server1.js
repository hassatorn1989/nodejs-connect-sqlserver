
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = {
    server: 'localhost',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: '1234'  //update me
        }
    },
    options: {
        encrypt: true,
        enableArithAbort: true,
        integratedSecurity: true,
        trustServerCertificate: true,
        rowCollectionOnDone: true,
        database: 'DB_LOGFILE2', //update me,
        validateBulkLoadParameters: true
    }
};
var connection = new Connection(config);

connection.on('connect', function (err) {
    executeStatement();
    if (err) {
        console.log(err);
    }
});

var Request = require('tedious').Request;

function executeStatement() {
    request = new Request("SELECT * FROM tb_user", function (err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}

