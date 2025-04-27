$(document).ready(function(){
  var data = [
          {
              name: "John Doe",
              email: "john@example.com",
              phone: "09123456789",
              status: "Active",
              joinDate: "2023-05-01"
          },
          {
              name: "Jane Smith",
              email: "jane@example.com",
              phone: "09987654321",
              status: "Inactive",
              joinDate: "2022-12-15"
          }
      ];

    $("#DT_MemberRecord").DataTable({
        data : data,
        columns : [
            {
                data : "name"
            },{
                data : "email"
            },{
                data : "phone"
            },
            {
                data : "status"
            },
            {
                data : "joinDate"
            },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <div class="dropdown text-end">
                            <button class="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ...
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">View Details</a></li>
                                <li><a class="dropdown-item" href="#">Edit</a></li>
                                <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
                            </ul>
                        </div>
                    `;
                }
            }
        ]
    });
});