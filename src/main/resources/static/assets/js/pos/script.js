$(document).ready(function () {
    $("#toggleOrder").click(function () {
        var orderSummary = $("#orderSummary");
        if (orderSummary.hasClass("d-none")) {
            orderSummary.removeClass("d-none");
            $(this).text("Hide Orders");
        } else {
            orderSummary.addClass("d-none");
            $(this).text("Show Orders");
        }
    });
});