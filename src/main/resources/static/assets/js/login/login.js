$(document).ready(function(){
    let yourUsername;
    $("#loginForm").on("submit", function(e){
        e.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

       $.ajax({
           url: 'checkUser',  // The URL to send the request to
           type: 'POST', // or 'GET' depending on your needs
           data: { username: username, password: password }, // Data to send to the server
           dataType: 'json', // Expected response format (e.g., 'json', 'html', 'text')
           success: function(response) {
               if(response.status == "success"){
                    window.location.href = "/home";
               }else{
                    $("#error").removeClass("d-none");
               }
           },
           error: function(xhr, status, error) {
               console.error(xhr.responseText); // Handle errors
           }
       });
    });

    $("#form_checkUsername").on("submit", function(e){
        e.preventDefault();
        var f_username = $("#f_username").val();
        $.ajax({
            url: 'ajax/checkRole',
            type: 'POST',
            data: { f_username : f_username},
            dataType: 'json',
            success: function(response) {
            console.log(response);
            var data = response.data;
                 if(response.status == "success"){
                    $("#answer1").val(data.answer1);
                    $("#answer2").val(data.answer2);
                    yourUsername = f_username;
                    var question1 = "<option value='1'>" + data.question1_name + "</option>";
                    var question2 = "<option value='2'>" + data.question2_name + "</option>";
                    $("#checkUsername").modal("hide");
                    $("#question").html(question1 + question2);

                    $("#securityQuestion").modal("show");
                }else{
                   Swal.fire(response.message, "", "error").then(() => {
                        location.reload();
                   });
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
            }
        });
    });

    $("#form_validateAnswer").on("submit", function(e){
        e.preventDefault();
        var question = $("#question").val();
        var answer = $("#answer").val().toLowerCase();
        var answer1 = $("#answer1").val().toLowerCase();
        var answer2 = $("#answer2").val().toLowerCase();
        console.log(question);
        if(question == 1){
            if(answer == answer1){
                console.log(yourUsername);
               $("#securityQuestion").modal("hide");
               $("#changePass").modal("show");
            }else{
                Swal.fire("Incorrect Answer!", "", "error").then(() => {
                    location.reload();
                });
            }
        }else if(question == 2){
            if(answer == answer2){
                console.log(yourUsername);
                $("#securityQuestion").modal("hide");
                $("#changePass").modal("show");
            }else{
                Swal.fire("Incorrect Answer!", "", "error").then(() => {
                    location.reload();
                });
            }
        }
    })

    $("#form_changePass").on("submit", function(e){
        e.preventDefault();
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        var newPassword = $("#newPassword").val();
        var confirmPassword = $("#confirmPassword").val();

        if(!passwordRegex.test(newPassword)){
            Swal.fire({
              title: "Error",
              text: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
              icon: "error"
            });
        }else if(newPassword != confirmPassword){
            Swal.fire({
              title: "Error",
              text: "New Password and Confirm Password must be the same.",
              icon: "error"
            });
        }else{
            Swal.fire({
                icon:"warning",
                title: "Do you want to save your new password?",
                showCancelButton: true,
                confirmButtonText: "Save"
            }).then(()=>{
                $.ajax({
                    url: 'ajax/updateNewPassword',
                    type: 'POST',
                    data: { username : yourUsername, newPassword : newPassword},
                    dataType: 'json',
                    success: function(response) {
                        if(response.status == "success"){
                            Swal.fire(response.message, "", "success").then(() => {
                                location.reload();
                            });
                        }else{
                            Swal.fire(response.message, "", "error").then(() => {
                                location.reload();
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('AJAX Error:', status, error);
                    }
                });
            });
        }
    });

    $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

});