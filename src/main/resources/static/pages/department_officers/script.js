$(document).ready(function(){

    const data = [
      {
        name: "Sis. Danica Aldousari",
        role: "President",
        contactNumber: "09123456789",
        email: "danica@example.com"
      },
      {
        name: "Sis. Melody Bilog",
        role: "Vice President",
        contactNumber: "09123456788",
        email: "melody@example.com"
      }
    ];

    $("#DT_DepartmentOfficersRecord").DataTable({
        data : data,
        columns : [
            {
                data : "name"
            },
            {
                data : "role"
            },
            {
                data : "contactNumber"
            },
            {
                data : "email"
            },
            {
                data : null,
                render : function (data, type, row){
                    return ` `
                }
            },
        ]
    });

});