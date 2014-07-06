$(document).on('submit', 'form#sign_in_user', function(e){
  e.preventDefault();
  var data = $(':input').serializeArray();
  $.ajax({
    url: '/users/sign_in',
    beforeSend: function(xhr){ xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').last().attr('content')) },
    type: 'POST',
    dataType: 'JSON',
    data: data,
    success: function(data){
      if (data.success) {
        return $('#sign_in').modal('hide');
      } else {
        return alert('failure!');
      }
    }
  });
});

// $("form#sign_in_user").bind("ajax:success", function(e, data, status, xhr) {
//   console.log(data.success);
//   if (data.success) {
//     return $('#sign_in').modal('hide');
//   } else {
//     return alert('failure!');
//   }
// });
