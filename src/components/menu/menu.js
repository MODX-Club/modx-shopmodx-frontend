import './menu.less';

window.onload = function() {
  $(function() {

    jQuery('ul.nav > li').hover(function() {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(0).fadeIn();
    }, function() {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(20).fadeOut();
    });
  });

}
