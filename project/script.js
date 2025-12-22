const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const idx = urlParams.get("project");
var data;

async function getData()
{
    try
    {
        const response = await fetch("../data.json");
        data = await response.json();
        data = data[0][idx];
    } catch (error)
    {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}

var projectName = document.querySelector("h1");
var projectDesc = document.querySelector("p");
var projectImg = document.querySelector("img");
var projectSkill = document.querySelector(".skills");

function updateData()
{
    if(!data)
    {
        alert("존재하지 않는 프로젝트입니다!");
        location.href = "../index.html";
    }
    projectImg.src = data[0];
    projectName.textContent = data[1];
    projectDesc.innerHTML = (data[3] != "") ? data[3] : "<small>Instead of a long description, a short summary is provided below.</small><br><br>" + data[2];

    data[4].forEach(skill => {
        projectSkill.insertAdjacentHTML("beforeend", `<li>${skill}</li>`);
    })
}

async function init()
{
    await getData();
    updateData();
}

init();