(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', 'ads', home]);
    
    function home($scope, $timeout, loading, $resource, ads){
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
        var pb = {ads: true, id: 'pna1-'+Math.random(), text: "Publicidade"};
        var pb2 = {ads: true, id: 'pna2-'+Math.random(), text: "Publicidade"};
        vm.content.push(pb);
        vm.content.push(pb2);
        
        content1Promise
        .then(successContent)
        .catch(failPromise);
        
        function pbReady(){
            ads.setAdsDiv(pb.id);
            ads.setAdsDiv(pb2.id);
            window.googletag.cmd.push(function() { googletag.display(pb.id);googletag.display(pb2.id); });
        }
        
        function successContent(data){
            vm.content = data;
            insertAds();
            loading.complete();
        }
        
        function failPromise(err){
            console.log(err);
        }
        
        function filterSuccessPromise(data){
            vm.content = data;
            insertAds();
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

        function insertAds(){
            var pos1 = Math.round(Math.random() * 9)+ 2,
                pos2 = Math.round(Math.random() * 9)+2;
            pos1 = pos1===pos2?Math.round(Math.random() * 9)+ 2:pos1;
            vm.content[pos1] = pb;
            vm.content[pos2] = pb2;
            angular.element(document).ready(pbReady);
        }
        
    }
    
})();