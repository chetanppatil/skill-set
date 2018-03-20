app.controller('testController', function($scope, $http) {

	$scope.skillList = [];
	$scope.showAdd = false;
	$scope.addSkills = {
		"id": "",
		"name": "",
		"status": null
	};

	$scope.getSkills = function(){
		$http.get('/skill-set/api/skills')
			.then(function(res) {

	      console.log('data', res.data);
				$scope.skillList = res.data;
			})
	    .catch(function(err){
	      // console.log('ERR::', err.data);
				$scope.errMsg = err.data.error ? err.data.error : 'Something went wrong!'
	    });
	};

	$scope.getSkills();

	// var localData = localStorage.getItem('data');
	// $scope.skillList.push(JSON.parse(localData))

	$scope.addSkill = function() {

		// $scope.addSkills.id = $scope.skillList.length + 1;
		// $scope.skillList.push($scope.addSkills)
		// localStorage.setItem('data', JSON.stringify($scope.addSkills))
		// $scope.addSkills = {};
		console.log('2222', $scope.addSkills);
		var stat = ($scope.addSkills.status == true) ? 1 : (($scope.addSkills.status) == false ? 0 : null);
		$http
     .post('/skill-set/api/skills', { name: $scope.addSkills.name, status: stat })
     .then(function(res) {
       // console.log('1111', res.data);
			 $scope.getSkills();
			 alert(res.data.msg);
     })
		 .catch(function(err){
			 // console.log('err', err.data);
			 alert(err.data.error ? err.data.error : 'Some error occured!');
		 });
	}

	$scope.changeSkill = function(obj) {
		// $scope.data = $scope.skillList[index];
		// console.log('22333', obj);
    $http
      .put('/skill-set/api/skills/'+ obj.id +'/update', { name: obj.name })
      .then(function(res) {
				// console.log('4444', res.data);
				$scope.openEdit = false;
				$scope.getSkills();
        alert(res.data.msg);
      })
			.catch(function(err){
 			 // console.log('err', err.data);
 			 alert(err.data.error ? err.data.error : 'Some error occured!');
 		 });


	}

	$scope.changeStatus = function(obj, status) {
		// console.log('dddd', index, status);
		$http
      .put('/skill-set/api/skills/'+ obj.id +'/approve', { status: status })
      .then(function(res) {
      	console.log('STAT--', res.data);
      })
			.catch(function(err){
				alert(err.data.error ? err.data.error : 'Some error occured!');
			});
	}
})

/***************************************************************************************

            Please refer below angular code for calling apis

***************************************************************************************/

/*

   $http.get('/api/skills').then(function(res) {

        Must return below array of json
        *******************************************************
          Sample JSON
        *******************************************************
        [{
          "id": "",
          "name": "",
          "status": null   //for approval (0 or 1)
        }]


    $scope.skillList = res.data;
 });



  //Add
  $scope.add = function() {
   $http
    .post('/api/skills', { name: $scope.data.name, status: $scope.data.status })
    .then(function(res) {
      alert('Skill added successfully!');
    });
  }

  Edit

  $scope.edit = function(index) {
    $scope.data = $scope.skillList[index];
    $http
      .put('/api/skills/'+ id +'/update', { name: $scope.data.name })
      .then(function(res) {
        alert('Skill updated Successfully');
      });
    $scope.openEdit = false;
  }


  //Change Statuys

  $scope.status = function(index, status){
    //Approve
    $http
      .put('/api/skills/'+ id +'/approve', { status: status })
      .then(function(res) {
        alert('This skill is ' + (status === 1 ? 'Approved' : 'Rejected'));
      });
  }

*/
