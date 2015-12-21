(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', home]);
    
    function home($scope, $timeout, loading, $resource){
        /* jshint validthis: true */
        var vm = this;
        
        vm.content = [];
        
        loading.start();
        
        
        var contentPromise = $resource('http://api.cxense.com/public/widget/data').save(
            {
                "widgetId":"6717f25ff501d279d9827ff7f975813821e057df"
            }
        ).$promise;
        
        contentPromise
        .then(successContent)
        .catch(failPromise);
        
        function successContent(data){
            loading.complete();
        }
        
        function failPromise(err){
            console.log(err);
        }
        
    }
    
})()