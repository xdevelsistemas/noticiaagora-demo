(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', home]);
    
    function home($scope, $timeout, loading, $resource){
        loading.start();
        
        /* jshint validthis: true */
        var vm = this;
        
        vm.content = [];
        vm.categorias = [
            {"id": 0, "name": "TODAS AS CATEGORIAS"},
            {"id": 1, "name": "NA RUA", "text": "NOTÍCIAS"},
            {"id": 2, "name": "NA MIXTURA", "text": "ENTRETENIMENTO"},
            {"id": 3, "name": "NA TORCIDA", "text": "ESPORTES"}
        ];
        /*vm.filter1 = [
            {"id": 0, "name": "+RECENTES"},
            {"id": 1, "name": "+ACESSADAS"}
        ];*/
        vm._model = {
            categoria: {"id": 0, "name": "TODAS AS CATEGORIAS"},
            filter: {"id": 0, "name": "+RECENTES"}
        };
        
        vm.filtrar = filtrar;
        
        
        var content1Promise = $resource('/rest/noticias/6717f25ff501d279d9827ff7f975813821e057df').query().$promise;
        
        content1Promise
        .then(successContent)
        .catch(failPromise);
        
        function successContent(data){
            data.forEach(function(el){
                vm.content.push(el);
            });
            loading.complete();
        }
        
        function failPromise(err){
            console.log(err);
        }
        
        function filterSuccessPromise(data){
            vm.content = data;
            loading.complete();
        }
        
        function filtrar(){
            loading.start();
            var promise;
            
            promise = vm._model.categoria.id === 0 ?
                $resource('/rest/noticias/6717f25ff501d279d9827ff7f975813821e057df').query(filterSuccessPromise).$promise :
                $resource('/rest/noticias/6717f25ff501d279d9827ff7f975813821e057df/'+vm._model.categoria.text).query().$promise;
            
            
            return promise
                .then(filterSuccessPromise)
                .catch(failPromise);
        }
        
    }
    
})();