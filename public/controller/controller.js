


var app = angular.module("contactlistApp", ['ngRoute']);

 app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    //  .when('/', {
    //    templateUrl :'pages/home.html',
    //    controller : 'MainCtrl'
    //  })
     //
    //  .when('/addcontact', {
    //     templateUrl : 'pages/addcontact.html',
    //     controller : 'MainCtrl'
    //   })
     //
    //  .when('/edit', {
    //     templateUrl :'pages/editContact.html',
    //     controller : 'MainCtrl'
    //   })

      $routeProvider.otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled: true, requireBase: false});
});



app.controller("MainCtrl", function($scope, $http){

  function refresh() {
      location.reload();
      }

   $scope.contacts = [];
      $http.get('/contactlist').then(function(response){
          console.log(" i got the data requested.");
          $scope.contacts = response.data;
          });


      $scope.delete = function(id){
       alert("delete button");
          console.log(id);
           $http({
             method: 'DELETE',
             url: '/contactlist/' + id
           }).then(function(){
             refresh();
           });
         };



      $scope.addContact = function(){
            alert("add contact button");
            $http.post('/contactlist', $scope.contact).then(function(data){
              alert("add callback");
              console.log(data);
              refresh();
            });
         };


       $scope.edit = function(id){
         console.log("from edit ", id);
            $http.get('/contactlist/' + id)
            .then(function callback(response){
             alert("callback function");
                $scope.contact = response.data;
                console.log(response.data);
             });
          };

      $scope.saveContact = function(id){
        console.log(id);
          $http.put('/contactlist/' + $scope.contact._id, $scope.contact);
          refresh();
        };

  });
