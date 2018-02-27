let addSkill = (inp) => {
  let deferred = q.defer();

  let query = queries.addSkill(inp);
  // console.log('query==', query);
  dbQuery.execute(query)
  .then((result) => {
    let dbResult = _.values(result[0])[0];
    if (dbResult == 'alreadyExists') {
      deferred.reject({
        code: "ERR004",
        error: "Skill already exists!"
      });
    } else {
      deferred.resolve({
        code: 200,
        msg: 'Skill added successfully!'
      });
    }

  })
  .catch((err) => {
    // console.log('err', err);
    deferred.reject(err);
  });

  return deferred.promise;
};

let validateInput = (inp) => {
  let deferred = q.defer();

  if (!inp.name) {
    deferred.reject({
      code: "ERR001",
      error: "Skill name is required."
    });
  // } else if (!inp.status && inp.status !== 0) {
  //   deferred.reject({
  //     code: "ERR002",
  //     error: "Status is required."
  //   });
  } else if (inp.status && inp.status !== 0 && inp.status !== 1) {
    deferred.reject({
      code: "ERR003",
      error: "Invalid status."
    });
  } else {
    deferred.resolve('ok');
  }

  return deferred.promise;
};

let start = (req, res) => {
  let reqBody = req.body;

  validateInput(reqBody)
    .then((validationRes) => {
      return addSkill(reqBody);
    })
    .then((dbRes) => {
      res.send(dbRes);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.start = start;
