require('es5-shim');
var $ = require('jQuery');

$(function() {

  $('[data-smodx-behav="recount"]').remove();

  $("#loginLoginForm [type=submit]").on('click', function() {
    var form = $(this).parents('form:first');
    var data = form.serialize();

    new Request({
        callbackName: 'login',
        noSuccessMsg: true
      })
      .run({
        "url": "assets/components/modxsite/connectors/connector.php",
        data: data,
        events: {
          "login": {
            onSuccess: function(resp) {
              if (resp.success) {
                var url = window.location.href.replace(/\?.*/, '');
                window.location.replace(url);
              }
            }
          }
        }
      });

    return false;
  });


});