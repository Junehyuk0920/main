if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
{
    $(".circle").hide();
    $(".p:not(#projects)").css("height", "500px");
    $("#projects").css("min-height", "500px");
}