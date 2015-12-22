(function(){
    'use strict';
    angular.module('app-NA', ['ngResource'])
    .factory('loading', loading);
    
    /* Funções */
    function loading($timeout) {
        
        var lg = {}, keys = {37: 1, 38: 1, 39: 1, 40: 1};
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
            _toTop();
            disableScroll();
            lg.$loading.fadeIn(800)
        }
        
        function complete(){
            lg.$loading.fadeOut(400);
            enableScroll();
        }
        
        function disableScroll() {
          if (window.addEventListener) // older FF
              window.addEventListener('DOMMouseScroll', preventDefault, false);
          window.onwheel = preventDefault; // modern standard
          window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
          window.ontouchmove  = preventDefault; // mobile
          document.onkeydown  = preventDefaultForScrollKeys;
        }

        function enableScroll() {
            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.onmousewheel = document.onmousewheel = null; 
            window.onwheel = null; 
            window.ontouchmove = null;  
            document.onkeydown = null;  
        }
        
        
        function preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault)
              e.preventDefault();
          e.returnValue = false;  
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }
        
        function _toTop(){
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return true;
        }
    }
})();