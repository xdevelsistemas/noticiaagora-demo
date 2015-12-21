(function(){
    'use strict';
    angular.module('app-NA', ['ngResource'])
    .factory('loading', loading);
    
    /* Funções */
    function loading($timeout) {
        
        var lg = {};
        lg.$loading = $('.loading');
        lg.setLoagind = setLoading;
        lg.start = start;
        lg.complete = complete;
        
        window.lgStart = start;
        window.lgComplete = complete;
        return lg;
        
        function setLoading($elem){
            lg.$loading = $($elem);
            return true;
        }
        
        function start(){
            lg.$loading.fadeIn(800)
        }
        
        function complete(){
            lg.$loading.fadeOut(400);
        }
    }
})();