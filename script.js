$('#goSpecs').click(function()
{
    window.scroll({top: 500, left: 0, behavior: 'smooth'});
})

$('#goSkills').click(function()
{
    window.scroll({top: 1350, left: 0, behavior: 'smooth'});
})

$('#goMyProjects').click(function()
{
    window.scroll({top: 2200, left: 0, behavior: 'smooth'});
})

$('#goContact').click(function()
{
    window.scroll({top: 4000, left: 0, behavior: 'smooth'});
})

$(".project").on("click", function()
{
    var middle = $(this).find("h1").html();
    middle = middle.toLowerCase();
    middle = middle.replace(/\s/gi, "");
    console.log(middle)
    window.open(`http://${middle}.dothome.co.kr`);
})

var languages = [ 85, 70, 70, 95, 35, 20, 5 ];

for(let i = 0; i < languages.length; i++)
{
    $(".gauge").eq(i).css("width", `${languages[i]}%`);
    $(".gauge").eq(i).html(`${languages[i]}%`);
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    $(".myProjects").css("grid-template-areas",
        `
            "box1 box3"
            "box2 box2"
            "box4 box5"
            "box7 box6"
        `);
    $(".mobile").css("display", "block");
    $(".header").css("padding", "20px");
    $(".center").css({"margin-inline": "10%", "text-align": "center"});
}