const languages = [
    ["HTML", 90],
    ["CSS", 85],
    ["JS", 70],
    ["PYTHON", 60],
    ["C", 90],
    ["C++", 87],
    ["PHP", 70],
    ["MySQL", 60],
    ["Arduino", 60]
];

const projects = [
    ["Junehyuk", true, "HTML / CSS / JS", "index.html"],
    ["JH Invest", true, "HTML / CSS / JS", "https://junehyuk0920.github.io/invest"],
    ["JH SNS (제작중)", true, "PHP / SQL / CSS"],
    ["Online Museum", true, "HTML / CSS / JS"],
    ["Current Weather", true, "HTML / CSS / JS"],
    ["JH DOSIRAK", true, "HTML / CSS / JS"],
    ["WJH Dictionary", false, "HTML / CSS / JS"],
    ["WJH Review", false, "HTML / CSS / JS"]
]

$("li > a").on("click", function()
{
    $("li > a").removeClass("selected");
    $(this).addClass("selected");
})

$(".topButton").on("click", function()
{
    $("html").animate({scrollTop: '0'}, 500);
})

const center = 564 / 2;
const radius = 220;
var totalRotation = 0;
var nth = 0;
const skills = $(".skill");
const total = skills.length;
var interval;

function reload()
{
    skills.each(function(i)
    {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        
        const x = center + radius * Math.cos(angle) - 50;
        const y = center + radius * Math.sin(angle) - 50;
        $(this).css("transform", `translate(${x}px, ${y}px)`);

        const degree = angle * 180 / Math.PI + 90;

        $(this).find("i, svg").css("transform", `rotate(${degree}deg)`);
    });
}

$(".skill").on("click", function()
{
    var idx = $(this).attr("data-idx");
    select(idx);
})

function select(idx)
{
    $(".skillName").html(languages[idx][0]);
    $(".percent").html(languages[idx][1] + '%');

    $(".skill").removeClass("focus");
    $(".skill").eq(idx).addClass("focus");

    nth = idx;
    rotate(idx);
}

function rotate(idx)
{
    const targetRotation = 360 / $(".skill").length * idx;
    let diff = targetRotation - (totalRotation % 360);
    
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    totalRotation += diff;

    $(".skills").css("transform", `rotate(${-totalRotation}deg)`);

    $(".skill i, .skill svg").css("transform", `rotate(${totalRotation}deg)`);

    skills.each(function(i)
    {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const degree = angle * 180 / Math.PI + 90;
        $(this).find("i, svg").css("transform", `rotate(${degree}deg)`);
    });
}

function autoPlay(flag)
{
    if(flag)
    {
        interval = setInterval(() =>
        {
            select(nth);

            nth++;
            if(nth == $(".skill").length) nth = 0;

        }, 3000);
    }
    else clearInterval(interval);
}

$(document).on("visibilitychange", function()
{
    if(document.hidden) autoPlay(0);
    else autoPlay(1);
})

$(".card").each(function(i)
{
    $(this).find(".name").html(projects[i][0]);
})

var flipped = [];

for(let i = 0; i < $(".card").length; i++) flipped.push(0);

$(document).on("click", ".card", function()
{
    clearInterval(doAnimation);
    $(".card").eq(0).css("transform", "");

    let index = $(this).index();

    let contentP =
    `
    <div class="content">
        <div>
            <div>
                <i class="ph ph-user"></i>
                <h3>Personal</h3>
            </div>
            <h2>${projects[index][2]}</h2>
        </div>
        <button data-idx="${index}" id="openURL">웹사이트 바로가기</button>
    </div>
    `;

    let contentT =
    `
    <div class="content">
        <div>
            <div>
                <i class="ph ph-users"></i>
                <h3>Team</h3>
            </div>
            <h2>${projects[index][2]}</h2>
        </div>
        <button data-idx="${index}" id="openURL">웹사이트 바로가기</button>
    </div>
    `;

    for(let i = 0; i < $(".card").length; i++)
        if(i != index) flipped[i] = 0;

    flipped[index] = 1 - flipped[index];
    let state = flipped[index];

    $(".card").removeClass("flipped");
    $(".content").remove();

    $(".name").show();

    if(state)
    {
        $(this).addClass("flipped");
        $(this).find(".name").hide();
        setTimeout(() =>
        {
            if(projects[index][1])
                $(this).append(contentP);
            else
                $(this).append(contentT);
        }, 220);
    }
})

$(document).on("click", "#openURL", function()
{
    let url = projects[$(this).data("idx")][3];

    if(url == undefined)
    {
        alert("do not have url");
    }
    else location.href = url;
})

/// first

reload();
autoPlay(1);

let scaleUp = true;

let doAnimation = setInterval(() =>
{
    if(scaleUp) $(".card").eq(0).css("transform", "scale(1.02)");
    else $(".card").eq(0).css("transform", "");

    scaleUp = !scaleUp;
}, 700);

///

if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
    $(".circle").hide();