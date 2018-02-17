const mysql = require('mysql');
const dbConfig = require('../config/db.json');

let execute = (qry) => {
  let deferred = q.defer();

  let connection = mysql.createConnection(dbConfig);

  connection.connect();

  connection.query(qry, function (error, results, fields) {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve(results);
    }
  });

  connection.end();

  return deferred.promise;
};


module.exports.execute = execute;
