let updateSkill = (id, inp) => {
  let deferred = q.defer();

  let name = inp.name ? "'" + inp.name + "'" : null;
  let query = queries.updateSkill(id, name, null, 'skill');
  // console.log('query==', query);
  dbQuery.execute(query)
  .then((result) => {
    let dbResult = _.values(result[0])[0];
    if (dbResult == 'skillNotExists') {
      deferred.reject({
        code: "ERR006",
        error: "No such skill exists!"
      });
    } else {
      deferred.resolve({
        code: 200,
        msg: 'Skill updated successfully'
      });
    }

  })
  .catch((err) => {
    // console.log('err', err);
    deferred.reject(err);
  });

  return deferred.promise;
};

let validateInput = (body) => {
  let deferred = q.defer();

  if (!body.name) {
    deferred.reject({
      code: "ERR001",
      error: "Skill name is required."
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
     return updateSkill(skillId, reqBody);
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.start = start;
