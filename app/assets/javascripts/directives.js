angular.module('directives', [])
  .directive('loadingIcon', function() {
    function link(scope){
      if (scope.loaded == undefined){
        scope.loaded = true;
      }

      scope.class = scope.class || "";
    }

    return {
      template: '<div ng-if="!loaded || !$parent.loaded" class="text-center"><span class="fa fa-circle-o-notch fa-spin text-muted"></span></div>' +
                '<div ng-if="loaded && $parent.loaded" class="{{class}}" ng-transclude></div>',
      scope: {
        loaded: '=?',
        class: '=?'
      },
      link: link,
      transclude: true
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
          this.className += " fade-op";
          this.style.opacity = 1;
        })
        .on('error', function(){
          this.style.display = "none";
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
      $el = $(element);
      if (scope.photo.average_nw_hex && scope.photo.average_se_hex){
        $el.find('.background')
          .css(
            "background-image",
            "-webkit-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
        )
      }

      var sf = scope.size / (scope.photo.width > scope.photo.height ? scope.photo.width : scope.photo.height);
      scope.width = scope.photo.width * sf;
      scope.height = scope.photo.height * sf;

      $el.find('.image')
        .css('opacity', 0)
        .on('load', function(){
          this.className += " fade-op";
          this.style.opacity = 1;
        })
        .on('error', function(){
          this.style.display = "none";
        })
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
  })
  .directive('tooltip', function(){
    function link(scope, element, attrs){
      $(element).tooltip({title: scope.message, placement: 'bottom'});
    }

    return {
      scope: {
        message: '@tooltip'
      },
      restrict: 'A',
      link: link
    }
  })
  .directive('showErrors', function() {
    return {
      restrict: 'A',
      require:  '^form',
      link: function (scope, el, attrs, formCtrl) {
        // find the text box element, which has the 'name' attribute
        var inputEl   = el[0].querySelector("[name]");
        // convert the native text box element to an angular element
        var inputNgEl = angular.element(inputEl);
        // get the name on the text box so we know the property to check
        // on the form controller
        var inputName = inputNgEl.attr('name');

        // only apply the has-error class after the user leaves the text box
        inputNgEl.bind('blur', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        })

        scope.$on('show-errors', function() {
          el.toggleClass('has-error', formCtrl[inputName].$invalid);
        });
      }
    }
  })

  .filter('inArray', function(){
    return function(array, notIn, attr){
      attr = attr || "id";
      notInIds = $.map(notIn, function(o){return o[attr]});
      return $.grep(array, function(obj){
        return $.inArray(obj[attr], notInIds) !== -1;
      });
    }
  })
  .filter('notInArray', function(){
    return function(array, notIn, attr){
      attr = attr || "id";
      notInIds = $.map(notIn, function(o){return o[attr]});
      return $.grep(array, function(obj){
        return $.inArray(obj[attr], notInIds) == -1;
      });
    }
  });
