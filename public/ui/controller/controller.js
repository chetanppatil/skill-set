app.controller('testController', function($scope, $http) {

	$scope.skillList = [];
	$scope.showAdd = false;
	$scope.addSkills = {
		"id": "",
		"name": "",
		"status": null
	};

	$http.get('/skill-set/api/skills')
		.then(function(res) {

      console.log('data', res.data);
			// $scope.skillList = res.data;
		})
    .catch(function(err){
      console.log('ERR::', err);
    });

	// var localData = localStorage.getItem('data');
	// $scope.skillList.push(JSON.parse(localData))

	$scope.addSkill = function() {

		$scope.addSkills.id = $scope.skillList.length + 1;
		$scope.skillList.push($scope.addSkills)
		localStorage.setItem('data', JSON.stringify($scope.addSkills))
		$scope.addSkills = {}
	}

	$scope.changeSkill = function(obj) {
		var a = $scope.skillList.indexOf(obj);
		$scope.skillList[a] = {
			"id": obj.id,
			"name": obj.name,
			"status": obj.status
		}

		$scope.openEdit = false;
		localStorage.setItem('data', JSON.stringify(obj))

	}

	$scope.changeStatus = function(obj) {
		alert("Your skill is " + obj)
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
