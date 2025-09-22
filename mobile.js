var vh_to_px;

if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
{
    function setPageHeight()
    {
        var winWidth = window.innerWidth;
        vh_to_px = (765 / 1440) * winWidth;

        $(".p:not(#projects)").css("height", `${vh_to_px}px`);
        $("#projects").css("min-height", `${vh_to_px}px`);
    }

    setPageHeight();
    $(window).on("resize orientationchange", setPageHeight);
}