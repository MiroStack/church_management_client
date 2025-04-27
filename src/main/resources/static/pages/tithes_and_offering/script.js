$(document).ready(function(){
    var data = [
          {
            name: "John Doe",
            amount: "₱250",
            date: "Mar 19, 2023",
            description: "Tithe for March"
          },
          {
            name: "Jane Smith",
            amount: "₱100",
            date: "Mar 18, 2023",
            description: "Youth Ministry support"
          }
    ];

    $("#DT_DonationRecord").DataTable({
        data : data,
        columns : [
            {
                data : "name"
            },
            {
                data : "amount"
            },
            {
                data : "date"
            },
            {
                data : "description"
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
                                <li><a class="dropdown-item" href="#">View Receipt</a></li>
                                <li><a class="dropdown-item" href="#">Edit Donation</a></li>
                                <li><a class="dropdown-item text-danger" href="#">Delete Donation</a></li>
                            </ul>
                        </div>
                    `;
                }
            }
        ]
    });
});