(function(){
    'use strict';
    angular.module('app-NA')
    .controller('home', ['$scope', 'loading', home]);
    
    function home($scope, loading){
        /* jshint validthis: true */
        var vm = this;
        
        loading.start();
        
        
        
        loading.complete();
    }
    
})()