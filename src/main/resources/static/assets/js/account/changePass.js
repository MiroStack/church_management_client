$(document).ready(function(){
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

   $("#form_changePass").on('submit', function(e){
        e.preventDefault();

        var currentPassword = $("#currentPassword").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var user_id = $("#user_id").val();
        console.log(password);
        if(!passwordRegex.test(password)){
            Swal.fire({
              title: "Error",
              text: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
              icon: "error"
            });
        }else if(password != confirmPassword){
            Swal.fire({
              title: "Error",
              text: "Password and Confirm Password must be the same.",
              icon: "error"
            });
        }else{
            Swal.fire({
              title: "Do you want to save the changes?",
              showCancelButton: true,
              confirmButtonText: "Save"
            }).then((result) => {
                if(result.isConfirmed){
                    $.ajax({
                        url: "/ajax/changePassword",
                        type: "POST",
                        data: {
                            password: password,
                            user_id: user_id,
                            currentPassword : currentPassword
                            },
                        success: function(response) {
                            console.log("Success:", response);
                            if(response.status == "success"){
                                Swal.fire(response.message, "", "success").then(() => {
                                   location.reload();
                                });
                            }else{
                                Swal.fire(response.message, "", "error");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error:", error); // Function to handle errors
                        }
                    });
                }
            });
        }
   })

});