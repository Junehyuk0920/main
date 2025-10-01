function scaleBody()
{
    var scale = $(window).width() / 1440;
    $("body").css("transform", "scale(" + scale + ")");
}

scaleBody();
$(window).on("resize", scaleBody);