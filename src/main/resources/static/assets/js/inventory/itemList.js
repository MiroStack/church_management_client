$(document).ready(function(){
    var DT_ItemList = $("#DT_ItemList").DataTable({
        "processing": true,
        "responsive" : true,
        "ajax": {
           "url": "ajax/getAllItem",
           "type": "POST"
        },
       columns: [
           {
               "data": "id",
                "render": function(data, type, row, meta) {
                    return `
                    <div class="d-flex gap-2">
                    <button class="btn btn-warning btn-sm edit" data-id="${data}"><span>Edit</span></button>
                    <button class="btn btn-danger btn-sm archive" data-id="${data}"><span>Archive</span></button>
                    </div>
                    `
                }
           },
           { "data": "name", "render": data => data ? data : "-" },
           { "data": "category_name", "render": data => data ? data : "-" },
           { "data": "brand", "render": data => data ? data : "-" },
            { "data": "stock", "render": data => data ? data : "-" },
           { "data": "unit", "render": data => data ? data : "-" },
           { "data": "description", "render": data => data ? data : "-" },
           { "data": "critical_quantity", "render": data => data ? data + ' <i class="fa-solid fa-triangle-exclamation" style="color: #f00f0f;"></i>' : "-" },
           { "data": "expire", "render": data => data ? "Yes" : "No" },
           { "data": "created_by", "render": data => data ? data : "-" },
           { "data": "created_at", "render": data => data ? data : "-" },
           { "data": "updated_by", "render": data => data ? data : "-" },
           { "data": "updated_at", "render": data => data ? data : "-" }
       ],
        fnCreatedRow: function(row, data, dataIndex) {
          $(row).find('.edit').on('click', function() {
            $("#method").val("Edit");
            var method = $("#method").val();
            $("#itemModalLabel").text(method + " Item");
            $("#id").val(data.id);
            $("#name").val(data.name);
            $("#brand").val(data.brand);
            $("#category_id").val(data.category_id);
            console.log(data.category_id);
            $("#description").val(data.description);
            $("#critical_quantity").val(data.critical_quantity);
            $("#unit").val(data.unit);
            if(data.expire){
                $("#expire").prop("checked", true).trigger("change");
            }else{
                $("#expire").prop("checked", false).trigger("change");
            }
            $("#itemModal").modal("show");
          });

            $(row).find('.archive').on('click', function() {
                var id = $(this).data("id");
                Swal.fire({
                   icon: "warning",
                   title: "Do you want to archive this item?",
                   showCancelButton: true,
                   confirmButtonText: "Save"
                }).then((result) => {
                    if(result.isConfirmed){
                        $.ajax({
                            url: "ajax/archiveItem",
                            type: "POST",
                            data: {id : id},
                            dataType: "json", // Expected response type
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
                                console.error("AJAX Error:", error);
                            }
                        });
                    }
                });
            })
        }
    });


    $("#form_item").on("submit", function(e){
        var expire = false;
        e.preventDefault();
        if($('#expire').is(':checked')){
            expire = true;
        }else{
            expire = false;
        }
        var formData = $(this).serialize()+'&expire='+expire;
         $("#itemModal").modal("hide");
        Swal.fire({
           icon: "warning",
           title: "Do you want to save these data?",
           showCancelButton: true,
           confirmButtonText: "Save",
        }).then((result) => {
            if(result.isConfirmed){
                $.ajax({
                    url: "ajax/addItem",
                    type: "POST",
                    data: formData,
                    dataType: "json", // Expected response type
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
                        console.error("AJAX Error:", error);
                    }
                });
            }else{
                 $("#itemModal").modal("show");
            }
        });
    });

    $("#addItem").on("click", function(){
        $("#method").val("Add");
        var method = $("#method").val();
        $("#itemModalLabel").text(method + " Item");
        $("#id").val("0");
        $("#form_item input").val("");
        $("#form_item select").val("");
        $("#form_item textarea").val("");
        $("#expire").prop("checked", false).trigger("change");
        $("#itemModal").modal("show");
    });

   $("#form_search").on("submit", function(e){
        e.preventDefault();
        var formData = $(this).serialize();
         $.ajax({
            url: "ajax/getAllItem",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                DT_ItemList.clear();
                DT_ItemList.rows.add(response.data).draw();
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: " + error);
            }
        });
   });

   $("#btnClear").on("click", function(){
        $("#form_search input").val("");
        $("#form_search select").val("0").trigger("change");
   });





    /// Stock In



     $("#stockIn").on("click", function(e){
           $("#stockInModal").modal("show");
    });

    let selectedRows = [];
    var DT_BatchList = $("#DT_BatchList").DataTable({
        columns: [
            { data: "name", "render": data => data ? data : "-" },
            { data: "brand", "render": data => data ? data : "-" },
            { data: "description", "render": data => data ? data : "-" },
            {
               "render": function(data, type, row, meta) {
                    return `<input class="quantity form-control" type="number" />`
               }
            },
            { data: "unit" },
            {
                data: "expire",
                "render": function(data, type, row, meta) {
                    if(data){
                        return `<input class="expireDate form-control" type="date" />`
                    }else{
                        return '-'
                    }
                }
            },
            {
              "render": function(data, type, row, meta) {
                return `<a class="remove"><i class="fa-solid fa-lg fa-circle-minus" style="color: #f00f0f;"></i></a>`
              }
            },
        ],
        fnCreatedRow: function(row, data, dataIndex) {
            $(row).find('.remove').on('click', function() {
                let row = $(this).closest("tr");
                let rowData = DT_BatchList.row(row).data();
                // Remove from array
                selectedRows = selectedRows.filter(item => item.id !== rowData.id);
                // Remove from DataTable
                DT_BatchList.row(row).remove().draw();
            });
        }
    });

    function toggleButton1() {
            $('#btnStockIn').prop('disabled', DT_BatchList.rows().count() === 0);
    }

    toggleButton1();

    DT_BatchList.on('draw', function () {
        toggleButton1();
    });

    $("#btnStockIn").on("click", function() {
        let batchData = [];
        var valid = false;
        $("#stockInModal").modal("hide");
        $("#DT_BatchList tbody tr").each(function() {
            var quantity = $(this).find(".quantity").val().trim();
            var expireDate = $(this).find(".expireDate").val();
            valid = true;
            if(quantity == "" || quantity == 0){
                Swal.fire("Please fill all the quantity to stock in field!", "", "error").then(() => {
                     $("#stockInModal").modal("show");
                });
                 valid = false;
                 return false;
            }else if(expireDate == "" || expireDate == 0){
                Swal.fire("Please fill all the expired date field!", "", "error").then(() => {
                    $("#stockInModal").modal("show");
                });
                valid = false;
                return false;
            }else{
                let row = $(this);
                let rowData = DT_BatchList.row(row).data();

                if (rowData) {
                    let quantity = row.find("input[type='number']").val();
                    let expireDate = row.find("input[type='date']").val();

                    batchData.push({
                        name: rowData.name || "-",
                        brand: rowData.brand || "-",
                        id : rowData.id,
                        description: rowData.description || "-",
                        unit: rowData.unit || "-",
                        quantity: quantity || 0,
                        expiration_date: expireDate || null
                    });
                }
            }
        });
        if(valid){
            Swal.fire({
               icon: "warning",
               title: "Do you want to save these data?",
               showCancelButton: true,
               confirmButtonText: "Save"
            }).then((result) => {
                if(result.isConfirmed){
                    $.ajax({
                        url: "ajax/stockIn",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(batchData),
                        success: function(response) {
                           if(response.status == "success"){
                              Swal.fire(response.message, "", "success").then(() => {
                                 location.reload();
                              });
                           }else{
                              Swal.fire(response.message, "", "error");
                           }
                        },
                        error: function(error) {
                            Swal.fire("Error in stock-in process:", "", "error");
                            console.log("Error in stock-in process:", error);
                        }
                    });
                }else{
                    $("#stockInModal").modal("show");
                }
            });
        }
    });

    $("#btnBrowse").on("click", function(){
        $("#DT_BrowseItem").DataTable().destroy();

        $("#DT_BrowseItem").DataTable({
            "processing": true,
            "ajax": {
               "url": "ajax/getAllItem",
               "type": "POST"
            },
            columns: [
                {
                    data: "id",
                    orderable: false, // Prevents sorting on checkbox column
                    searchable: false, // Prevents searching on checkbox column
                    render: function(data, type, row, meta) {
                        let isChecked = selectedRows.some(r => r.id == data) ? "checked" : "";
                        return `
                          <div class="form-check">
                              <input ${isChecked} class="form-check-input check" type="checkbox" value="" id="flexCheckDefault${data}">
                              <label class="form-check-label" for="flexCheckDefault${data}">
                              </label>
                          </div>`;
                    }
                },
                { data: "name" },
                { data: "category_name" },
                { data: "description" }
            ],
            "columnDefs": [
                { "className": "text-start", "targets": "_all" }
            ],
            fnCreatedRow: function(row, data, dataIndex) {
                $(row).find('.check').on('click', function() {
                    var id = data.id;
                    var name = data.name;
                    var brand = data.brand;
                    var description = data.description;
                    var unit = data.unit;
                    var expire = data.expire;
                    if ($(this).is(":checked")) {
                        if (!selectedRows.some(row => row.id === id)) {
                            selectedRows.push({ id: id, brand : brand, name: name, description : description, unit : unit, expire : expire });
                        }
                    } else {
                        selectedRows = selectedRows.filter(row => row.id !== id);
                    }
                    console.log(selectedRows);
                });
            }
        });

        $("#browseItem").modal("show");
    });

    $("#DT_StockInHistory").DataTable({
        "processing": true,
        "ajax": {
           "url": "ajax/getStockInHistory",
           "type": "POST"
        },
        columns: [
            {data : "batch_id"},
            {data : "name"},
            {data : "category_name"},
            {data : "brand"},
            {
             data : "description",
             render: function(data, type, row, meta) {
                return data ? data : "-";
             }
            },
            {data : "quantity"},
            {data : "expiration_date"},
            {data : "encoded_by"},
            {data : "encoded_date"},
        ]
    });

    $("#saveBrowseItem").on("click", function(){
        DT_BatchList.clear().rows.add(selectedRows).draw();
        $("#browseItem").modal("hide");
    });

//    Stock Out
    $("#stockOut").on("click", function(e){
        initDT_StockOutHistory();
        $("#stockOutModal").modal("show");
    });

     let selectedRows2 = [];
    var DT_BatchList2 = $("#DT_BatchList2").DataTable({
        columns: [
            { data: "batch_id", "render": data => data ? data : "-" },
            { data: "name", "render": data => data ? data : "-" },
            { data: "brand", "render": data => data ? data : "-" },
            { data: "description", "render": data => data ? data : "-" },
            { data: "stock" },
            {
               "render": function(data, type, row, meta) {
                    return `<input class="quantity form-control" type="number" />`
               }
            },
            { data: "unit" },
            {
               data: "expiration_date",
               "render": function(data, type, row, meta) {
                   return data ? data : "-";
                }
            },
            {
              "render": function(data, type, row, meta) {
                return `<a style="cursor:pointer;" class="remove"><i class="fa-solid fa-lg fa-circle-minus" style="color: #f00f0f;"></i></a>`
              }
            },
        ],
        fnCreatedRow: function(row, data, dataIndex) {
            $(row).find('.remove').on('click', function() {
                let row = $(this).closest("tr");
                let rowData = DT_BatchList2.row(row).data();
                // Remove from array
                selectedRows2 = selectedRows2.filter(item => item.id !== rowData.id);
                // Remove from DataTable
                DT_BatchList2.row(row).remove().draw();
            });
        }
    });

    $("#btnBrowseBatch").on("click", function(){
        $("#DT_BrowseBatchItem").DataTable().destroy();

        $("#DT_BrowseBatchItem").DataTable({
                    "processing": true,
                    "ajax": {
                       "url": "ajax/getBatchItemList",
                       "type": "POST"
                    },
                    columns: [
                        {
                            data: "id",
                            orderable: false,
                            searchable: false,
                            render: function(data, type, row, meta) {
                                let isChecked = selectedRows2.some(r => r.id == data) ? "checked" : "";
                                return `
                                  <div class="form-check">
                                      <input ${isChecked} class="form-check-input check" type="checkbox" value="" id="flexCheckDefault${data}">
                                      <label class="form-check-label" for="flexCheckDefault${data}">
                                      </label>
                                  </div>`;
                            }
                        },
                        {data: "batch_id"},
                        {data: "name"},
                        {data: "category_name"},
                        {data: "quantity"},
                        {data: "description"},
                    ],
                    "columnDefs": [
                        { "className": "text-start", "targets": "_all" }
                    ],
                    fnCreatedRow: function(row, data, dataIndex) {
                        $(row).find('.check').on('click', function() {
                            var id = data.id;
                            var batch_id = data.batch_id;
                            var name = data.name;
                            var brand = data.brand;
                            var description = data.description;
                            var unit = data.unit;
                            var quantity = data.quantity;
                            var expiration_date = data.expiration_date;
                            if ($(this).is(":checked")) {
                                console.log("tessss");
                                if (!selectedRows2.some(row => row.id === id)) {
                                    selectedRows2.push({ id: id, brand : brand, name: name, description : description, unit : unit, expiration_date : expiration_date, batch_id : batch_id, stock : quantity });
                                }
                            } else {
                                console.log("tesss2");
                                selectedRows2 = selectedRows2.filter(row => row.id !== id);
                            }
                            console.log(selectedRows2);
                        });
                    }
        });

         $("#saveBrowseBatchItem").on("click", function(){
                DT_BatchList2.clear().rows.add(selectedRows2).draw();
                $("#browseBatchItem").modal("hide");
        });

        $("#browseBatchItem").modal("show");
    });

    $("#btnStockOut").on("click", function() {
            let batchData = [];
            var valid = false;
            $("#stockOutModal").modal("hide");
            $("#DT_BatchList2 tbody tr").each(function() {
                var quantity = $(this).find(".quantity").val();
                let row = $(this);
                let rowData = DT_BatchList2.row(row).data();
                var availStock = rowData.stock;
                console.log(availStock);
                valid = true;
                if(quantity == "" || quantity == 0){
                    Swal.fire("Please fill all the quantity to stock out field!", "", "error").then(() => {
                          $("#stockOutModal").modal("show");
                    });
                    valid = false;
                    return false;
                }else if (+availStock < +quantity){
                    Swal.fire("Quantity to stock out should be not greater than on available stock", "", "error").then(() => {
                        $("#stockOutModal").modal("show");
                    });
                    valid = false;
                    return false;
                }else{
                    if (rowData) {
                        let quantity = row.find("input[type='number']").val();
                        batchData.push({
                            batch_id : rowData.batch_id,
                            id : rowData.id,
                            brand : rowData.brand,
                            description : rowData.description,
                            expiration_date : rowData.expiration_date,
                            quantity: quantity || 0,
                        });
                    }
                }
            });
            if(valid){
                Swal.fire({
                   icon: "warning",
                   title: "Do you want to save these data?",
                   showCancelButton: true,
                   confirmButtonText: "Save"
                }).then((result) => {
                    if(result.isConfirmed){
                        $.ajax({
                            url: "ajax/stockOut",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(batchData),
                            success: function(response) {
                               if(response.status == "success"){
                                  Swal.fire(response.message, "", "success").then(() => {
                                     location.reload();
                                  });
                               }else{
                                  Swal.fire(response.message, "", "error");
                               }
                            },
                            error: function(error) {
                                Swal.fire("Error in stock-in process:", "", "error");
                                console.log("Error in stock-in process:", error);
                            }
                        });
                    }else{
                        $("#stockOutModal").modal("show");
                    }
                });
            }
        });

    function toggleButton() {
            $('#btnStockOut').prop('disabled', DT_BatchList2.rows().count() === 0);
    }

     toggleButton();

    DT_BatchList2.on('draw', function () {
             toggleButton();
    });

   function initDT_StockOutHistory(){
        $("#DT_StockOutHistory").DataTable().destroy();
        $("#DT_StockOutHistory").DataTable({
            "processing": true,
            "ajax": {
               "url": "ajax/getStockOutHistory",
               "type": "POST"
            },
            columns: [
                {data : "batch_id"},
                {data : "name"},
                {data : "category_name"},
                {data : "brand"},
                {
                 data : "description",
                 render: function(data, type, row, meta) {
                    return data ? data : "-";
                 }
                },
                {data : "quantity"},
                {
                    data : "expiration_date",
                     render: function(data, type, row, meta) {
                        return data ? data : "-";
                     }
                },
                {data : "encoded_by"},
                {data : "encoded_date"},
            ]
        });
   }

});