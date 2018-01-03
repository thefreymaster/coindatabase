app.directive('gainLossClass', function(){
     return {
          restrict: "AE", 
          require: false, 
          scope: {
               metric: '@'
          },
          link: function (scope, element) {
               if(parseInt(scope.metric) > 0)
               {
                    element.addClass('gain');
               }
               else{
                    element.addClass('loss');
               }
               
          }
      }
})