angular.module('directives', [])
  .directive('loadingIcon', function() {
    function link(scope){
      if (scope.loaded == undefined){
        scope.loaded = true;
      }

      scope.class = scope.class || "";
    }

    return {
      template: '<div ng-if="!loaded || !$parent.loaded" class="text-center loader"><p><span class="fa fa-circle-o-notch fa-spin text-muted"></span></p></div>' +
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
      if (!scope.size) scope.height = $el.parent().width();

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
        height: '@?',
        width: '@?'
      },
      transclude: true,
      restrict: 'E',
      link: link
    }
  })
  .directive('photoElement', function(){
    function link(scope, element, attrs){
      var $el = $(element);

      if (scope.height){
        scope.size = scope.height;

        scope.width = (scope.photo.width / scope.photo.height) * scope.height;
      } else {
        if (!scope.size) scope.size = $el.parent().width();

        var sf = scope.size / (scope.photo.width > scope.photo.height ? scope.photo.width : scope.photo.height);
        scope.width = scope.photo.width * sf;
        scope.height = scope.photo.height * sf;
      }

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

      scope.topSize = 'large_2048';

      function imageLoad(){
        this.className += " fade-op";
        this.style.opacity = 1;
      }

      function imageError(){
        this.style.display = "none";
      }

      var sizes = {
        1600: 'large_1600',
        1024: 'large_1024',
        800: 'medium_800',
        640: 'medium_640',
        500: 'medium_500',
        320: 'small_320',
        240: 'small_240'
      };

      $.each(sizes, function(size, name){
        if (size >= scope.size){
          scope.topSize = name;
        }
      });

      scope.image = $el.find('.image');

      // scope.first = true;
      // scope.second = false;
      //
      // scope.$watch('photo', function(){
      //   if (scope.first){
      //     scope.first = false;
      //     scope.second = true;
      //     return;
      //   }
      //   if (scope.second){
      //     scope.second = false;
      //
      //     scope.image.on('load', function(){
      //       // if (!scope.size) scope.size = $el.parent().width();
      //       //
      //       // var sf = scope.size / (scope.photo.width > scope.photo.height ? scope.photo.width : scope.photo.height);
      //       // scope.width = scope.photo.width * sf;
      //       // scope.height = scope.photo.height * sf;
      //     })
      //   }
      // });

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
        size: '=?',
        height: '=?'
      },
      restrict: 'E',
      transclude: true,
      link: link
    }
  })
  .directive('photoReel', function(){
    function link(scope, element, attrs){
      var $el = $(element);

      scope.height = $el.height();

      $scroller = $el.find('.reel-row');
      var containerWidth = $scroller.width();

      // target elements with the "draggable" class
      interact($scroller[0])
        .draggable({
          // allow dragging of multple elements at the same time
          max: Infinity,

          maxPerElement: Infinity,

          // call this function on every dragmove event
          onmove: function (event) {
            var newVal = parseInt($scroller.css('margin-left')) + event.dx;

            // if (newVal > 0){
            //   newVal = 0;
            // } else if (newVal < -totalWidth) {
            //   // newVal = totalWidth;
            // }
            $scroller.css('margin-left', newVal);
          }
        })
        // enable inertial throwing
        .inertia({
          resistance: 8,
          allowResume: true,
          zeroResumeDelta: true
        })
        // keep the element within the area of it's parent
        // .restrict({
        //   drag: "parent",
        //   endOnly: true,
        //   elementRect: { top: 0, left: 0, bottom: 0, right: 1 }
        // });

      interact.maxInteractions(Infinity);
    }

    return {
      templateUrl: 'directives/photo-reel.html',
      scope: {
        photos: '=',
      },
      transclude: true,
      restrict: 'E',
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
  }]).
  directive('adminBox', function(){
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude ng-if="current_user"></div>'
    }
  })

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
  })

  .directive('ngTypeahead', function ($parse) {
    return {
      restrict: 'A',
      scope: {
        filter: '&',
        ngModel: '=',
        selectedItem: '=',
        limit: '=',
        rateLimitWait: '='
      },
      link: function (scope, element, attrs) {

        var foods = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('id'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          prefetch: attrs.url.replace('%QUERY', ''),
          remote: attrs.url
        });

        foods.initialize();

        if (attrs.limit) {
          construct.limit = attrs.limit;
        }

        if (attrs.rateLimitWait) {
          construct.remote.rateLimitWait = attrs.rateLimitWait;
        }

        element.typeahead(null, {
          source: foods.ttAdapter(),
          displayKey: attrs.valueKey,
          name: 'food-items'
        });

        element.on('change', function (event) {
          if (attrs.ngModel) {
            scope.ngModel = $(event.target).val();
          }

          scope.$apply();
        });

        element.on('typeahead:selected', function (event, datum, dataset) {
          if (attrs.ngModel) {
            scope.ngModel = attrs.valueKey?datum[attrs.valueKey]:datum;
          }

          scope.$apply();
          $(event.target).val(attrs.valueKey?datum[attrs.valueKey]:datum);
        });

        element.on('typeahead:autocompleted', function (event, datum, dataset) {
          if (attrs.ngModel) {
            scope.ngModel = attrs.valueKey?datum[attrs.valueKey]:datum;
          }

          scope.$apply();
          $(event.target).val(attrs.valueKey?datum[attrs.valueKey]:datum);

          element.typeahead('close')
        });

        scope.$on('$destroy', function () {
          element.typeahead('destroy');
        });
      }
    };
  })
