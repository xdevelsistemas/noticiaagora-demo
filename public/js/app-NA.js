(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', home]);
    
    function home($scope, $timeout, loading, $resource){
        loading.start();
        
        /* jshint validthis: true */
        var vm = this, c=0;
        
        vm.content = [];
        vm.categorias = [
            {"id": 0, "name": "TODAS AS CATEGORIAS"},
            {"id": 1, "name": "ENTRETENIMENTO"},
            {"id": 2, "name": "ESPORTES"},
            {"id": 3, "name": "NOTÍCIAS"}
        ];
        vm.filter1 = [
            {"id": 0, "name": "+RECENTES"},
            {"id": 1, "name": "+ACESSADAS"}
        ];
        vm._model = {
            categoria: {"id": 0, "name": "TODAS AS CATEGORIAS"},
            filter: {"id": 0, "name": "+RECENTES"}
        };
        
        vm.filtrar = filtrar;
        
        
        var content1Promise = $resource('/rest/noticias').query().$promise,
            content2Promise = $resource('/rest/noticias').query().$promise,
            content3Promise = $resource('/rest/noticias').query().$promise,
            content4Promise = $resource('/rest/noticias').query().$promise;
        
        content1Promise
        .then(successContent)
        .catch(failPromise);
        
        content2Promise
        .then(successContent)
        .catch(failPromise);
        
        content3Promise
        .then(successContent)
        .catch(failPromise);
        
        content4Promise
        .then(successContent)
        .catch(failPromise);
        
        function successContent(data){
            data.forEach(function(el){
                vm.content.push(el);
            });
            c === 3?loading.complete():c++;
        }
        
        function failPromise(err){
            console.log(err);
        }
        
        function filtrar(){
            $resource('/rest/noticias')
        }
        
    }
    
})();