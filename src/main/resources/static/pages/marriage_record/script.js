$(document).ready(function(){
    const data = [
      {
        groom: "John Smith",
        bride: "Mary Johnson",
        date: "Jun 15, 2023",
        venue: "Main Sanctuary",
        status: "Completed",
        pastor: "Pastor Rodolfo Mojica"
      },
      {
        groom: "Robert Wilson",
        bride: "Jennifer Lee",
        date: "Aug 22, 2023",
        venue: "Main Sanctuary",
        status: "Completed",
        pastor: "Pastor Fresco Q. Sulapas"
      },
    ];

    $("#DT_MarriageRecord").DataTable({
        data : data,
        columns : [
            {
              data: "groom",
              render: function(data, type, row) {
                return data + ' & ' + row.bride;
              }
            },
            {
                data : "date"
            },
            {
                data : "venue"
            },
            {
                data : "status"
            },
            {
                data : "pastor"
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