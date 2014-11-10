angular.module('directives', [])
  .directive('loadingIcon', function() {
    function link(scope){
      if (scope.loaded == undefined){
        scope.loaded = true;
      }

      scope.class = scope.class || "";
    }

    return {
      template: '<div ng-if="!loaded || !$parent.loaded" class="text-center"><p><span class="fa fa-circle-o-notch fa-spin text-muted"></span></p></div>' +
                '<div ng-if="loaded && $parent.loaded" class="{{class}}" ng-transclude></div>',
      scope: {
        loaded: '=?',
        class: '@?'
      },
      link: link,
      transclude: true
    };
  })
  .directive('photoSquare', function(){
    function link(scope, element, attrs){
      var $el = $(element);
      if (!scope.size) scope.size = $el.parent().width();

      if (scope.photo.average_nw_hex && scope.photo.average_se_hex){
        $el.find('.background')
          .css(
            "background-image",
            "-webkit-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
          .css(
            "background-image",
            "-o-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
          .css(
            "background-image",
            "linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
      }

      function imageLoad(){
        this.className += " fade-op";
        this.style.opacity = 1;
      }

      function imageError(){
        this.style.display = "none";
      }

      scope.images = $el.find('.image');

      scope.images
        .css('opacity', 0)
        .on('load', imageLoad)
        .on('error', imageError);

      scope.$on("$destroy", function(){
        scope.images.off();
      });

    }

    return {
      templateUrl: 'directives/photo-square.html',
      scope: {
        photo: '=',
        caption: '=',
        href: '=',
        size: '=?',
        height: '@?'
      },
      transclude: true,
      restrict: 'E',
      link: link
    }
  })
  .directive('photoElement', function(){
    function link(scope, element, attrs){
      var $el = $(element);

      if (!scope.size) scope.size = $el.parent().width();

      if (scope.photo.average_nw_hex && scope.photo.average_se_hex){
        $el.find('.background')
          .css(
            "background-image",
            "-webkit-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
          .css(
            "background-image",
            "-o-linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
          .css(
            "background-image",
            "linear-gradient(-45deg, "+scope.photo.average_nw_hex+", "+scope.photo.average_se_hex+")"
          )
      }

      var sf = scope.size / (scope.photo.width > scope.photo.height ? scope.photo.width : scope.photo.height);
      scope.width = scope.photo.width * sf;
      scope.height = scope.photo.height * sf;

      function imageLoad(){
          this.className += " fade-op";
          this.style.opacity = 1;
        }

        function imageError(){
          this.style.display = "none";
        }

        scope.image = $el.find('.image');

        scope.image
          .css('opacity', 0)
          .on('load', imageLoad)
          .on('error', imageError);

        scope.$on("$destroy", function(){
          scope.image.off();
        });
    }

    return {
      templateUrl: 'directives/photo-element.html',
      scope: {
        photo: '=',
        size: '=?'
      },
      restrict: 'E',
      transclude: true,
      link: link
    }
  })
  .directive('isodate', function(){
    function link(scope, element, attrs){
      $(element).attr('title', moment(scope.iso).format('MMMM Do YYYY [at] hh:mm')).livestamp(scope.iso);

      scope.$on("$destroy", function(){
        $(element).livestamp('destroy');
      });
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

      scope.$on("$destroy", function(){
        $(element).tooltip('destroy');
      });
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

        scope.$on("$destroy", function(){
          inputNgEl.unbind();
        });
      }
    }
  }).
  directive('affix', ['$timeout', function($timeout){
    return {
      restrict: 'A',
      link: function(scope, el, attrs){
        var $el = $(el);

        $timeout(function(){
          var $next = $el.next();
          var marginTop = parseInt($next.css('margin-top'));
          var metaHeight = $el.outerHeight();

          $el.on('affixed.bs.affix', function(){
            $('body').addClass('hero-passed');
            $next.css('margin-top', marginTop + metaHeight);
          })

          $el.on('affixed-top.bs.affix', function(){
            $('body').removeClass('hero-passed');
            $next.css('margin-top', marginTop);
          })

          $el.affix({
            offset: {
              top: $(scope.aboveTag).outerHeight() + $('.navbar-fixed-top').outerHeight() - ($el.outerHeight() * 2)
            }
          });
        });

        scope.$on("$destroy", function(){
          $(window).off('.affix');
          $el.off();
        });
      },
      scope: {
        aboveTag: '@affix'
      }
    }
  }])

  .filter('inArray', function(){
    return function(array, notIn, attr){
      attr = attr || "id";
      var notInIds = $.map(notIn, function(o){return o[attr]});
      return $.grep(array, function(obj){
        return $.inArray(obj[attr], notInIds) !== -1;
      });
    }
  })
  .filter('notInArray', function(){
    return function(array, notIn, attr){
      attr = attr || "id";
      var notInIds = $.map(notIn, function(o){return o[attr]});
      return $.grep(array, function(obj){
        return $.inArray(obj[attr], notInIds) == -1;
      });
    }
  });
