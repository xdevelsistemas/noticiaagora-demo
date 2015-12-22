(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', home]);
    
    function home($scope, $timeout, loading, $resource){
        /* jshint validthis: true */
        var vm = this;
        
        vm.content = [];
        
        loading.start();
        
        
        var contentPromise = $resource('/rest/noticias').get().$promise;
        
        contentPromise
        .then(successContent)
        .catch(failPromise);
        
        function successContent(data){
            //todo renderizar o objeto
            loading.complete();
        }
        
        function failPromise(err){
            console.log(err);
        }
        
    }
    
})();