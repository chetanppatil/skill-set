let getSkills = () => {
  let deferred = q.defer();

  let query = queries.getSkills();
  // console.log('query==', query);
  dbQuery.execute(query)
  .then((result) => {
    // console.log('result', result);
    if (_.isEmpty(result)) {
      deferred.reject({
        code: 'ERR005',
        error: 'No record found.'
      });
    } else {
      deferred.resolve(result);
    }

  })
  .catch((err) => {
    // console.log('err', err);
    deferred.reject(err);
  });

  return deferred.promise;
};

let start = (req, res) => {

  getSkills()
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
};

module.exports.start = start;
