let updateStatus = (id, inp) => {
  let deferred = q.defer();

  let query = queries.updateSkill(id, null, inp.status, 'status');
  // console.log('query==', query);
  dbQuery.execute(query)
  .then((result) => {
    // console.log('result', result);
    let dbResult = _.values(result[0])[0];
    if (dbResult == 'skillNotExists') {
      deferred.reject({
        code: "ERR006",
        error: "No such skill exists!"
      });
    } else {
      deferred.resolve({
        code: 200,
        msg: 'Skill status updated successfully'
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

  if (!inp.status && inp.status !== 0) {
    deferred.reject({
      code: "ERR002",
      error: "Status is required."
    });
  } else {
    deferred.resolve('ok');
  }

  return deferred.promise;
};

let start = (req, res) => {
  let skillId = req.params.id,
    reqBody = req.body;

  validateInput(reqBody)
    .then((validationRes) => {
     return updateStatus(skillId, reqBody);
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.start = start;
