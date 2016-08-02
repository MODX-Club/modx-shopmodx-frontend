export default function showDataErrors(target, data) {
  let fields = target.find('.form-group').removeClass('has-error');
  if (!!data) {
    data.map(function(el, i) {
      target.find('[name="' + el.id + '"]').parents('.form-group:first').addClass('has-error');
    });
    return true;
  }

  return false;
}
