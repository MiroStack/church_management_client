$(document).ready(function(){
    var method;

    var DT_ProductList = $("#DT_ProductList").DataTable({
        "processing": true,
        "ajax": {
           "url": "ajax/getAllProduct",
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
        "columns":[
            {
                "data": "id",
                render : function(data){
                    return `<button data-id="${data}" class="editProduct btn btn-warning"><span>Edit</span></button>
                    <button data-id="${data}" class="deleteProduct btn btn-danger"><span>Delete</span></button>`
                }
            },
            { "data": "name" },
            { "data": "category_name" },
            { "data": "price" },
            { "data": "description" },
            { "data": "available" },
        ],
         "columnDefs": [
           { "className": "text-start", "targets": "_all" } // Apply to all columns
        ],
        fnCreatedRow: function(row, data, dataIndex) {
            $(row).find('.editProduct').on('click', function() {
                method = "Edit";
                console.log(row);
                var id = $(this).data("id");
                $("#id").val(id);
                $("#product_name").val(data.name);
                $("#category_id").val(data.category_id);
                $("#description").val(data.description);
                $("#price").val(data.price);
                if (data.available) {
                    $("#available").prop("checked", true); // Correct way to check the checkbox
                } else {
                    $("#available").prop("checked", false); // Uncheck if false
                }
                $("#method").val(method);
                $("#productModalLabel").text(method + "     Product");
                $("#productModal").modal("show");
            });

             $(row).find('.deleteProduct').on('click', function() {
                var id = $(this).data("id");
                $("#id").val(id);

                    Swal.fire({
                       icon: "warning",
                       title: "Do you want to delete this product?",
                       showCancelButton: true,
                       confirmButtonText: "Save"
                    }).then((result) => {
                         if(result.isConfirmed){
                            $.ajax({
                                url: 'ajax/deleteProduct',
                                type: 'POST',
                                data: {id : id},
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
                                    console.error('Error:', error);
                                }
                            });
                         }
                    });
             });
        }
     });

    $("#form_addProduct").on("submit", function(e){
        e.preventDefault();

        var available = false

        if($('#available').is(':checked')){
            available = true;
        }else{
            available = false;
        }
        var formData = $(this).serialize() +'&available='+available;

        $("#productModal").modal("hide");
      Swal.fire({
           icon: "warning",
           title: "Do you want to save these data?",
           showCancelButton: true,
           confirmButtonText: "Save"
        }).then((result) => {
            if(result.isConfirmed){
                 $.ajax({
                    url: 'ajax/addProduct',
                    type: 'POST',
                    data: formData,
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
                        Swal.fire(error, "", "error");
                        console.error('Error:', error);
                    }
                });
            }else{
                $("#productModal").modal("show");
            }
        });
    });

    $(".addProduct").on("click", function(){
        method = "Add";
        $("#id").val(0);
        $("#method").val(method);

        $("#form_addProduct input").val("");
        $("#form_addProduct select").val("");
        $("#form_addProduct textarea").val("");
        $("#available").prop("checked", false);

        $("#productModalLabel").text(method + "     Product");
        $("#productModal").modal("show");
    });

    $("#form_search").on("submit", function(e){
        e.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            url: "ajax/getAllProduct",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                DT_ProductList.clear();
                DT_ProductList.rows.add(response.data).draw();
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: " + error);
            }
        });
    })

    $("#btnClear").on("click", function(){
        $("#form_search input").val("");
        $("#form_search select").val("0");
    })

});