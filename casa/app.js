var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   //$locationProvider.html5Mode(true);

   $routeProvider

   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'views/home.html',
      controller     : 'HomeCtrl',
   })

   // para a rota '/sobre', carregaremos o template sobre.html e o controller 'SobreCtrl'
   .when('/sobre', {
      templateUrl : 'views/sobre.html',
      controller  : 'SobreCtrl',
   })

   // para a rota '/contato', carregaremos o template contato.html e o controller 'ContatoCtrl'
   
  .when('/contato', {
      templateUrl : 'views/contato.html',
      controller  : 'ContatoCtrl',
   })

   .when('/registrar', {
      templateUrl : 'views/registrar.html',
      controller  : 'RegistrarCtrl',
  })

    .when('/publicar', {
      templateUrl : 'views/push.html',
      controller  : 'ContatoCtrl',
   })
   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});



app.controller('HomeCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('RegistrarCtrl', function($rootScope, $location, $http)
{
   $rootScope.activetab = $location.path();

   $rootScope.usuario = {};

   $rootScope.registrar = function()
   {
        $http.post('api/v1.0/usuario' , $rootScope.usuario).
        then(data => {
          alert('foi enviado');
        }).catch(e => {console.log(e)});
   }

});

app.controller('SobreCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});

app.controller('ContatoCtrl', function($rootScope, $location , $http)
{
   $rootScope.activetab = $location.path();

   $rootScope.clientes = [];

   $http.get('http://www.sivendiweb.com.br/api/v1.0/usuarios/' ,).then(a => { console.log(a); $rootScope.clientes = a.data } , e => {console.log(e)});

});



app.directive('ifLoading', ifLoading);

    ifLoading.$injector = ['$http'];

    function ifLoading($http){

        return {
            restrict: 'A',
            link: function(scope, elem) {
                scope.isLoading = isLoading;

                scope.$watch(scope.isLoading, toggleElement);

                function toggleElement(loading) {

                  if (loading) {
                    elem[0].style.display = "block";
                  } else {
                    elem[0].style.display = "none";
                  }
                }

                function isLoading() {
                  return $http.pendingRequests.length > 0;
                }
            }
        }
    };
