let urlDOM = document.querySelector(".loadingPage h2");
const msg = "Web Developer!";

urlDOM.innerHTML = '';

function delay(ms)
{
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function printMsg()
{
    for(let chr of msg)
    {
        urlDOM.innerHTML += chr;
        await delay(150);
    };
}

async function typing()
{
    await delay(1000);
    printMsg();
}

// loadingPage animation

var data;

async function getData()
{
    try
    {
        const response = await fetch("./data.json");
        data = await response.json();
    } catch (error)
    {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}

async function init()
{   
    typing();
    await getData();

    document.querySelectorAll(".buttons button").forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            appendCards(idx);
            document.querySelectorAll(".buttons button").forEach(elem => {
                elem.classList.remove("selected");
            })
            elem.classList.add("selected");
        })
    })

    document.querySelectorAll("header ul li a").forEach((elem, idx) => {
        elem.addEventListener("click", () => {
            appendCards(idx);
            document.querySelectorAll("header ul li a").forEach(elem => {
                elem.classList.remove("selected");
            })
            elem.classList.add("selected");
        })
    })

    async function appendCards(k)
    {
        document.querySelector(".cards").innerHTML = ' ';
        data[k].forEach((elem, idx) => {
            var card;
            
            if(k == 0)
            {
                card = `
                    <div class="card portfolio">
                        <div class="image">
                            <img src="${elem[0]}" alt="">
                        </div>
                        <div>
                            <div>
                                <h1 class="name">${elem[1]}</h1>
                                <p>${elem[2]}</p>
                            </div>
                            <div>
                                <a href="#">Live Demo<i class="ph ph-arrow-square-out"></i></a>
                                <button class="detail">Detail <i class="ph ph-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            }
            else if(k == 1)
            {
                card = `
                    <div class="card">
                        <div class="image">
                            <img src="${elem[0]}" alt="">
                        </div>
                        <div>
                            <h1 class="name">${elem[1]}</h1>
                            <div class="date">${elem[2]}</div>
                        </div>
                    </div>
                `;
            }
            else
            {
                card = `
                    <div class="card skill">
                        <div class="image">
                            <img src="${elem[0]}" alt="">
                        </div>
                        <div>
                            <h1 class="name">${elem[1]}</h1>
                            <div class="date">${elem[2]}</div>
                        </div>
                    </div>
                `;
            }
            
            document.querySelector(".cards").insertAdjacentHTML("beforeend", card);

            if(k == 2)
            {
                document.querySelectorAll(".card").forEach(dom => {
                    dom.querySelector(".image").style.height = "150px";
                })
            }
            else
            {
                document.querySelectorAll(".card").forEach(dom => {
                    dom.querySelector(".image").style.height = "250px";
                })
            }
        });
    };

    await appendCards(0);

    document.querySelector(".cards").addEventListener("click", e => {
        if(e.target.closest(".detail"))
        {
            let allButtons = Array.from(document.querySelectorAll(".detail"));
            let idx = allButtons.indexOf(e.target.closest(".detail"));

            location.href = `./project/index.html?project=${idx}`;
        }
    })
}

init();