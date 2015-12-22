(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', '$timeout', 'loading', '$resource', home]);
    
    function home($scope, $timeout, loading, $resource){
        /* jshint validthis: true */
        var vm = this, c=0;
        
        vm.content = [];
        
        loading.start();
        
        
        var content1Promise = $resource('/rest/noticias').get().$promise,
            content2Promise = $resource('/rest/noticias').get().$promise,
            content3Promise = $resource('/rest/noticias').get().$promise,
            content4Promise = $resource('/rest/noticias').get().$promise;
        
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
            vm.content.push(data.items.filter(function(el){
                return el.dominantthumbnail && el.title && el.click_url;
            }));
            if(c === 3){
                loading.complete();
            }else{
                c++;
            }
        }
        
        function failPromise(err){
            console.log(err);
        }
        
    }
    
})();