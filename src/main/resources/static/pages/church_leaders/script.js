$(document).ready(function(){

const data = [
  {
    name: "Pastor Rodolfo Mojica",
    position: "Sending Pastor",
    email: "pastor.rodolfo@bbek.org",
    phone: "09123456789",
    dateAppointed: "Jan 15, 2010",
    status: "Active"
  },
  {
    name: "Pastor Fresco Q. Sulapas",
    position: "Senior Pastor",
    email: "pastor.fresco@bbek.org",
    phone: "09234567890",
    dateAppointed: "Mar 22, 2015",
    status: "Active"
  },
  {
    name: "Deacon Roberto Santos",
    position: "Head Deacon",
    email: "roberto.santos@bbek.org",
    phone: "09345678901",
    dateAppointed: "Jun 10, 2012",
    status: "Active"
  }
];

    $("#DT_ChurchLeaders").DataTable({
        data : data,
        columns : [
            {
                data: "name"
            },
            {
                data: "position"
            },
            {
                data: "email",
                render: function(data, type, row) {
                 return `${data} <br> ${row.phone}`;
                }
            },
            {
                data: "dateAppointed"
            },
            {
                data: "status"
            },
            {
                data: "status"
            },
        ]
    });

});