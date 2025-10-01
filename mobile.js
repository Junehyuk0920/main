function scaleBody()
{
    var winWidth = $(window).width();
    var scale = winWidth / 1440;

    $("body").css({
        "transform": "scale(" + scale + ")",
        "width": 1440 / scale + "px",
        "margin": "0 auto"
    });
}

scaleBody();
$(window).on("resize", scaleBody);
