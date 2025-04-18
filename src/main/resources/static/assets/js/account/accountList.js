$(document).ready(function(){

    var DT_Account = $("#DT_Account").DataTable({
        "processing": true,
           "ajax": {
               "url": "ajax/getAllUser",
               "type": "POST",
               "dataType": "json",
               "dataSrc": function(response) {
                   if (response.status === "failed") {
                       window.location.href = "login";
                   }else{
                        return response.data;
                   }
               }
           },
           "columns": [
            { "render": function(data, type, row, meta) {
              return `<button data-id="${row.user_id}" class='btn edit btn-warning btn-sm'>Edit</button>
                    <button data-username="${row.username}" data-id="${row.user_id}" class='btn reset btn-primary btn-sm'>Reset Password</button>
                    <button  data-id="${row.user_id}" class='btn archive btn-danger btn-sm'>Archive</button>
                    `;
              }
            },
            {
                "data": "user_id",
                "render": function(data, type, row, meta) {
                   return "User-" + String(data).padStart(3, '0');
                }
            },
            {
             "render": function(data, type, row, meta) {
                   return row.first_name + ' ' + row.middle_name + ' ' + row.last_name;
                }
             },
            { "data": "username" },
            { "data": "role_name" },
            { "data": "last_login",
                 "render": function(data, type, row, meta) {
                    return (data && data !== '') ? data : '-';
                 }
            },
            { "data": "last_logout",
                "render": function(data, type, row, meta) {
                   return (data && data !== '') ? data : '-';
                }
            }
           ],
           "columnDefs": [
               { "className": "text-start", "targets": "_all" } // Apply to all columns
           ],
            fnCreatedRow: function(row, data, dataIndex) {
                 $(row).find('.edit').on('click', function() {
                    $("#user_id").val(data.user_id);
                    $("#user_id_text").val('User-' + String(data.user_id).padStart(3, '0'));
                    $("#usernameEdit").val(data.username);
                    $("#first_nameEdit").val(data.first_name);
                    $("#last_nameEdit").val(data.last_name);
                    $("#middle_nameEdit").val(data.middle_name);
                    $("#role_idEdit").val(data.role_id);
                    $("#question1Edit").val(data.question1_id).trigger("change");
                    $("#question2Edit").val(data.question1_id).trigger("change");
                    $("#answer1Edit").val(data.answer1);
                    $("#answer2Edit").val(data.answer2);
                    $("#editAccount").modal("show");
                 });

                 $(row).find('.archive').on('click', function() {
                    var id = $(this).data("id");
                    console.log(id);
                    Swal.fire({
                       icon: "warning",
                       title: "Do you want to archive this account?",
                       showCancelButton: true,
                       confirmButtonText: "Save"
                    }).then((result) => {
                         if(result.isConfirmed){
                            $.ajax({
                             url: "ajax/archiveUser",
                             type: "POST",
                             data:{ user_id : id},
                             dataType: "json",
                             success: function(response) {
                                 if(response.status == "success"){
                                    Swal.fire(response.message, "", "success").then(() => {
                                       location.reload();
                                    });
                                 }else{
                                    Swal.fire(response.message, "", "error");
                                 }
                             },
                             error: function(xhr, status, error) {
                                 console.error("AJAX Error: " + error);
                             }
                           });
                         }
                    });

                 });

                  $(row).find('.reset').on('click', function() {
                     var id = $(this).data("id");
                     var username = $(this).data("username");
                     console.log(username);
                     console.log(id);
                     Swal.fire({
                        icon: "warning",
                        title: "Do you want to reset the password of this account?",
                        showCancelButton: true,
                        confirmButtonText: "Yes"
                     }).then((result) => {
                          if(result.isConfirmed){
                             $.ajax({
                              url: "ajax/resetUser",
                              type: "POST",
                              data:{ user_id : id, username : username},
                              dataType: "json",
                              success: function(response) {
                                  if(response.status == "success"){
                                     Swal.fire(response.message, "Username and the new password is the same", "success").then(() => {
                                        location.reload();
                                     });
                                  }else{
                                     Swal.fire(response.message, "", "error");
                                  }
                              },
                              error: function(xhr, status, error) {
                                  console.error("AJAX Error: " + error);
                              }
                            });
                          }
                     });
                  });
            }
    });

    var DT_AccountArchived = $("#DT_ArchiveAccount").DataTable({
            "processing": true,
               "ajax": {
                   "url": "ajax/getAllArchivedUser",
                   "type": "POST"
               },
               "columns": [
                { "render": function(data, type, row, meta) {
                  return `<button data-id="${row.user_id}" class='btn restore btn-primary btn-sm'>Restore</button>
                        <button data-id="${row.user_id}" class='btn delete btn-danger btn-sm'>Delete</button>`;
                  }
                },
                {
                    "data": "user_id",
                    "render": function(data, type, row, meta) {
                       return "User-" + String(data).padStart(3, '0');
                    }
                },
                {
                 "render": function(data, type, row, meta) {
                       return row.first_name + ' ' + row.middle_name + ' ' + row.last_name;
                    }
                 },
                { "data": "username" },
                { "data": "role_name" },
                { "data": "last_login",
                     "render": function(data, type, row, meta) {
                        return (data && data !== '') ? data : '-';
                     }
                },
                { "data": "last_logout",
                    "render": function(data, type, row, meta) {
                       return (data && data !== '') ? data : '-';
                    }
                }
               ],
               "columnDefs": [
                   { "className": "text-start", "targets": "_all" } // Apply to all columns
               ],
                fnCreatedRow: function(row, data, dataIndex) {
                      $(row).find('.restore').on('click', function() {
                        var id = $(this).data("id");
                        Swal.fire({
                           icon: "warning",
                           title: "Do you want to restore this account?",
                           showCancelButton: true,
                           confirmButtonText: "Save"
                        }).then((result) => {
                            if(result.isConfirmed){
                                $.ajax({
                                    url: 'ajax/restoreAccount',
                                    type: 'POST',
                                    data: { user_id : id},
                                    dataType: 'json',
                                    success: function(response) {
                                         if(response.status == "success"){
                                           Swal.fire(response.message, "", "success").then(() => {
                                              location.reload();
                                           });
                                        }else{
                                           Swal.fire(response.message, "", "error");
                                        }
                                    },
                                    error: function(xhr, status, error) {
                                        console.error('AJAX Error:', status, error);
                                    }
                                });
                            }
                        });
                      });
                }
        });

    $("#form_search").on("submit", function(e){
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: "ajax/getAllUser",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                DT_Account.clear();
                DT_Account.rows.add(response.data).draw();
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: " + error);
            }
        });
    })

    $("#form_searchArchive").on("submit", function(e){
            e.preventDefault();
            var formData = $(this).serialize();
            $.ajax({
                url: "ajax/getAllArchivedUser",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    DT_AccountArchived.clear();
                    DT_AccountArchived.rows.add(response.data).draw();
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error: " + error);
                }
            });
        })

    $("#role_id").on("change", function(){
       var role_id = $(this).val();
       if(role_id == 1){
           $("#questionContainer").removeClass("d-none");
           $("#question1").prop("required", true);
           $("#question2").prop("required", true);
           $("#answer1").prop("required", true);
           $("#answer2").prop("required", true);
       }else{
            $("#questionContainer").addClass("d-none");
            $("#question1").prop("required", false);
            $("#question2").prop("required", false);
            $("#answer1").prop("required", false);
            $("#answer2").prop("required", false);
       }
    })

    $("#editAccount").on("show.bs.modal", function (e) {
        $("#role_idEdit").trigger("change");
    });

     $("#role_idEdit").on("change", function(){
       var role_id = $(this).val();
       if(role_id == 1){
           $("#questionContainerEdit").removeClass("d-none");
           $("#question1Edit").prop("required", true);
           $("#question2Edit").prop("required", true);
           $("#answer1Edit").prop("required", true);
           $("#answer2Edit").prop("required", true);
       }else{
            $("#questionContainerEdit").addClass("d-none");
            $("#question1Edit").prop("required", false);
            $("#question2Edit").prop("required", false);
            $("#answer1Edit").prop("required", false);
            $("#answer2Edit").prop("required", false);
       }
     })

     $("#form_editAccount").on("submit", function(e){
        e.preventDefault();
        $("#editAccount").modal("hide");
        Swal.fire({
           icon: "warning",
           title: "Do you want to save the changes?",
           showCancelButton: true,
           confirmButtonText: "Save"
        }).then((result) => {
            if(result.isConfirmed){
              var formData = $("#form_editAccount").serialize();

              $.ajax({
                url: "ajax/updateUserInfo",
                type: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    if(response.status == "success"){
                       Swal.fire(response.message, "", "success").then(() => {
                          location.reload();
                       });
                    }else{
                       Swal.fire(response.message, "", "error");
                    }
                },
                error: function(xhr, status, error) {
                    console.error("AJAX Error: " + error);
                }
              });
            }else{
                $("#editAccount").modal("show");
            }
        });

     });
    $("#form_addAccount").on("submit", function(e){
        e.preventDefault();

        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;


        var password = $("#password").val();
        var username = $("#username").val();
        var confirmPassword = $("#confirmPassword").val();
        $("#addAccount").modal("hide");
        if(!passwordRegex.test(password)){
            Swal.fire({
              title: "Error",
              text: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
              icon: "error"
            }).then((result) => {
                $("#addAccount").modal("show");
            });
        }else if(password != confirmPassword){
            Swal.fire({
              title: "Error",
              text: "Password and Confirm Password must be the same.",
              icon: "error"
            }).then((result) => {
                $("#addAccount").modal("show");
            });
        }else{
            Swal.fire({
              icon: "warning",
              title: "Do you want to save the changes?",
              showCancelButton: true,
              confirmButtonText: "Save"
            }).then((result) => {
                var formData = $("#form_addAccount").serialize();

                if(result.isConfirmed){
                    $.ajax({
                        url: "/ajax/addAccount",
                        type: "POST",
                        data: formData,
                        success: function(response) {
                            if(response.status == "success"){
                                Swal.fire(response.message, "", "success").then(() => {
                                   location.reload();
                                });
                            }else{
                                Swal.fire(response.message, "", "error");
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error:", error);
                        }
                    });
                }else{
                    $("#addAccount").modal("show");
                }
            });
        }
    })

    $("#btnClear").on("click", function(e){
        $("#form_search input").val("");
        $("#form_search select").val(0).trigger("change");
    })


});