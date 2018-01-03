var angular;

angular.module('pageJuiceComputer', [
  'ngRoute',
  'nsPopover',
  'uiGmapgoogle-maps',
])

.controller('MainCtrl', ['$scope', function($scope) {
    $scope.items = [{
      title: 'Comunicación',
      descrip:'Una página web refuerza y actualiza la imagen corporativa de la empresa. Mantener una web actualizada, bien diseñada y con la información actualizada y al alcance, le dará a su negocio un aspecto innovador, exitoso, confiable y en constante renovación.'
    }, {
      title: 'Autogestión',
      descrip:'Gracias a los smartphones, cualquier emprendedor puede estar conectado a su empresa las 24 horas del día y, a través de las apps, aumentar la eficiencia, reducir costes o hacer crecer las ventas y notoriedad. Actualmente hay solo en España hay 22 millones de usuarios activos que cada día descargan cuatro millones de aplicaciones para móviles.'
    }, {
      title: 'Carácter',
      descrip:'Generar imagen de marca: no nos engañemos, decir que tu negocio tiene una app queda bien, ya sea contándolo a nuestros conocidos y clientes, con una pegatina en el escaparate de la tienda o un buen banner en la página web.'
    }];
}])

.controller('FormsCtrl', ['$scope', '$compile', function($scope, $compile) {

  $scope.loadDemand = function() {
    var htmlcontent = $('#loadhtml');
    htmlcontent.load('views/solicitud.html')
    $compile(htmlcontent.contents())($scope);
  }

  $scope.loadInscription = function() {
    var htmlcontent = $('#loadhtml');
    htmlcontent.load('views/inscripcion.html')
    $compile(htmlcontent.contents())($scope);
  }
}])

.controller('ContactCtrl',['$scope', '$http','$timeout', function($scope, $http, $timeout) {
    var urlBase = 'contact/';
    var jsonP = '&callback=JSON_CALLBACK'; 

    $scope.name = '';
    $scope.mail = '';
    $scope.msg = '';

    $scope.map = { 
      center: { 
        latitude: 37.9906471, 
        longitude: -1.1327759 
      }, 
      zoom: 8,
      options: { streetViewControl: false,draggable:false,scrollwheel:false } 
    };
    $scope.marker = {
        id: 0,
        coords: {
          latitude: 37.9906471,
          longitude: -1.1327759
        },
        options: { draggable: false },
    }

    $scope.sendmail = function() {
      $scope.response = '';

      if($scope.name==='' || $scope.mail==='' || $scope.msg===''){
        $scope.response = 'No Deje Campos en Blanco, Por Favor';
      }else{
        $http.post(urlBase, 
            {
              'name':$scope.name,
              'mail': $scope.mail,
              'msg': $scope.msg
            }
          )
         .success(function(data){
            $scope.response = data;
            $scope.name = '';
            $scope.mail = '';
            $scope.msg = '';
            $timeout(function(){ 
              $scope.messageState = 'hide';
            }, 4000);
        })
        .error(function (data, status) {
            console.log(status);
        });
      }
    };    
}])

