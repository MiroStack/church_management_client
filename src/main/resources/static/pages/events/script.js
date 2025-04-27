$(document).ready(function(){
    var data = [
              {
                  title: "Sunday Service",
                  date: "Mar 26, 2023	",
                  time: "9:00 AM - 12:00 PM",
                  location: "Main Sanctuary",
                  participants: "150"
              },
            {
                title: "Bible Study	",
                date: "Bible Study",
                time: "7:00 PM - 8:30 PM",
                location: "Fellowship Hall",
                participants: "30"
            },
          ];

    $("#DT_EventsRecord").DataTable({
        data : data,
        columns : [
            {
                data : "title"
            },{
                data : "date"
            },{
                data : "time"
            },
            {
                data : "location"
            },
            {
                data : "participants"
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
                                <li><a class="dropdown-item" href="#">View Event Details</a></li>
                                <li><a class="dropdown-item" href="#">Edit Event Information</a></li>
                                <li><a class="dropdown-item text-danger" href="#">Cancel Event</a></li>
                            </ul>
                        </div>
                    `;
                }
            }
        ]
    });
});