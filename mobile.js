function scaleBody()
{
    var winWidth = $(window).width();
    var scale = winWidth / 1440;

    $("body").css({
        "transform": "scale(" + scale + ")",
        "transform-origin": "top left",
        "width": 1440 + "px",
        "margin": 0,
        "padding": 0
    });
}

scaleBody();
$(window).on("resize", scaleBody);