const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idx = parseInt(urlParams.get("project"));
var data;

async function getData()
{
    try
    {
        const response = await fetch("../data.json");
        data = await response.json();
        data = data[0];
    } catch (error)
    {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}

var projectName = document.querySelector("h1");
var projectDesc = document.querySelector("p");
var projectImg = document.querySelector("img");
var projectSkill = document.querySelector(".skills ul");

var screenW;

function updateData()
{
    let dt = data[idx];
    if(!dt)
    {
        alert("존재하지 않는 프로젝트입니다!");
        location.href = "../index.html";
    }
    projectImg.src = "." + dt[0];
    projectName.textContent = dt[1];
    projectDesc.innerHTML = (dt[3] != "") ? dt[3] : dt[2] + "<br><br><small>Only Short Description</small>";

    // console.log(screenW);

    projectSkill.innerHTML = "";
    dt[4].forEach(skill => {
        projectSkill.insertAdjacentHTML("beforeend", `<li>${skill}</li>`);
    })
}

async function init()
{
    await getData();
    updateData();
}

init();

document.querySelector(".home").addEventListener("click", () => {
    location.href = "../index.html";
})

document.querySelector(".prev").addEventListener("click", () => {
    if (idx > 0) location.href = `./index.html?project=${idx-1}`;
    else alert("가장 처음 프로젝트입니다!");
})

document.querySelector(".next").addEventListener("click", () => {
    if (idx < data.length-1) location.href = `./index.html?project=${idx+1}`;
    else alert("가장 마지막 프로젝트입니다!");
})

window.addEventListener("resize", () => {
    screenW = Math.max(parseInt(window.innerWidth / 5), 200);
    updateData();
});