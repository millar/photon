angular.module('directives', [])
  .directive('loadingIcon', function() {
    return {
      template: '<div ng-if="!loaded" class="text-center"><span class="fa fa-circle-o-notch fa-spin text-muted"></span></div>'
    };
  })
  .directive('photoSquare', function(){
    function link(scope, element, attrs){
      $el = $(element);
      if (!scope.size) scope.size = $el.parent().width();

      if (scope.photo.average_nw_hex && scope.photo.average_se_hex){
        $el.find('.background')
          .css(
            "background-image",
            "-webkit-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
      }

      $el.find('.image')
        .css('opacity', 0)
        .on('load', function(){
          this.className += " fade-op"
          this.style.opacity = 1;
        })
    }

    return {
      templateUrl: 'directives/photo-square.html',
      scope: {
        photo: '=',
        caption: '=',
        href: '=',
        size: '=?'
      },
      transclude: true,
      restrict: 'E',
      link: link
    }
  })
  .directive('photoElement', function(){
    function link(scope, element, attrs){
      if (scope.photo.average_nw_hex && scope.photo.average_se_hex){
        $(element).find('.background')
          .css(
            "background-image",
            "-webkit-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
        )
      }

      var sf = scope.size / (scope.photo.width > scope.photo.height ? scope.photo.width : scope.photo.height);
      scope.width = scope.photo.width * sf;
      scope.height = scope.photo.height * sf;
    }

    return {
      templateUrl: 'directives/photo-element.html',
      scope: {
        photo: '=',
        size: '=',
        labels: '='
      },
      restrict: 'E',
      link: link
    }
  })
  .directive('isodate', function(){
    function link(scope, element, attrs){
      $(element).attr('title', scope.iso).livestamp(scope.iso);
    }

    return {
      scope: {
        iso: '=isodate'
      },
      restrict: 'A',
      link: link
    }
  });
