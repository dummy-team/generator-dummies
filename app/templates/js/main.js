(function() {
  $(function() {
    return $(window).ready(function() {
      $(".no-touch img.hover").hoverSrc();
      if (!Modernizr.input.placeholder) {
        $("input").each(function() {
          if ($(this).attr("placeholder") !== "") {
            return $(this).placeholder();
          }
        });
      }
      if ($("#fadeshow").index() >= 0 && $("#fadeshow").find('.item').length > 1) {
        $("#fadeshow").fade();
      }
      if ($(".slideshow").index() >= 0 && $(".slideshow").find('.news-latest-item').length > 1) {
        return $(".slideshow").each(function() {
          return $(this).slide('.news-latest-container', '.news-latest-item');
        });
      }
      /*
      
      # Add backToTop anchor when half a screen  is scrolled
      $('body').append('<a id="backToTop" href="#">Back to top</a>')
      $('#backToTop').backToTop($(window).height()/2)
      
      # Handle pulldown
      $('.pulldown').pulldown()
      
      # Refresh scroll offset of backToTop button appearance
      $(window).bind 'resize', ->
        $('#backToTop').backToTop($(window).height()/2)
      */

    });
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/