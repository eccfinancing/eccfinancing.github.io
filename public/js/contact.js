/**
 * @fileoverview Client side script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */
$(document).ready(function() {
  $('#contact-message').val('');
  $('#contact-message').trigger('autoresize');
  $('#contact-form').submit(function(event) {
    event.preventDefault();
    $('#contact-form button').addClass('disabled');
    $('#contact-form input, #contact-message').attr('disabled', true);
    $.post('/message', {
      name: $('#contact-name').val(),
      email: $('#contact-email').val(),
      ticker: $('#contact-ticker').val(),
      message: $('#contact-message').val()
    }, function(result) {
      $('#contact-form button').removeClass('disabled');
      $('#contact-form input, #contact-message').attr('disabled', false);
      $('#contact-form input, #contact-message').val('');
      if (result['error']) {
        Materialize.toast('There was an error! Try again later', 4000);
      } else {
        Materialize.toast('Message sent!', 4000);
      }
    });
  });
});
