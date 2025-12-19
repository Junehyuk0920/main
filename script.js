let urlDOM = document.querySelector(".loadingPage h2");
const msg = "Web Developer!";

function delay(ms)
{
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

urlDOM.innerHTML = '';

async function printMsg()
{
    for(let chr of msg)
    {
        urlDOM.innerHTML += chr;
        await delay(150);
    };
}

let typing = async () => {
    await delay(1000);
    printMsg();
}

typing();

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

const data = [
    [
        ["https://dummyimage.com/600x400/000/fff", "JH SNS (제작중)", "#DB #통신 #API"],
        ["./images/face.png", "실시간 얼굴 인식기", "#딥러닝 #Flask"],
        ["./images/chatbot.png", "JH 챗봇 (카카오톡 챗봇)", "#API #Flask"],
        ["./images/invest.png", "JH Invest", "#반응형 #UIUX"],
        ["https://dummyimage.com/600x400/000/fff", "Online Museum", "#Interaction #UIUX"],
        ["https://dummyimage.com/600x400/000/fff", "Current Weather", "#API"],
        

    ],
    [
        ["./images/itq_hangeul.png", "ITQ 한글 A급", "2025.09.12"],
        ["./images/nypc.png", "NYPC 2라운드 진출", "2025.08.17"],
        ["./images/itq_hangeul.png", "ITQ 파워포인트 A급", "2025.03.14"],
        ["./images/gifted.png", "충청남도천안교육지원청 AI/SW 영재교육원 수료", "2024.11.16"],
        ["./images/diat.png", "DIAT 파워포인트 중급", "2023.02.17"],
    ],
    [
        ["./images/html.png", "HTML", "90%"],
        ["./images/css.png", "CSS", "85%"],
        ["./images/js.png", "Javascript", "80%"],
        ["./images/c.svg", "C언어", "90%"],
        ["./images/c++.png", "C++", "85%"],
        ["./images/python.jpeg", "Python", "70%"],
        ["./images/php.png", "php", "60%"],
        ["./images/sql.png", "MySQL", "50%"],
        ["./images/react.png", "React", "30%"],
        ["./images/vue.png", "Vue.js", "60%"],
        ["./images/arduino.png", "Arduino", "40%"],
        ["./images/legoSpike.png", "Lego Spike", "90%"],
    ]
]

function appendCards(k)
{
    document.querySelector(".cards").innerHTML = ' ';
    data[k].forEach((elem, idx) => {
        var card;
        
        if(k == 0)
        {
            let t = [];

            elem[2].split(" ").forEach(item => {
                t += `<h5>${item}</h5>`;
            })

            card = `
                <div class="card" style="grid-area: c${idx+1}">
                    <div class="image">
                        <img src="${elem[0]}" alt="">
                    </div>
                    <div>
                        <h1 class="name">${elem[1]}</h1>
                        <div class="tags">${t.toString()}</div>
                    </div>
                </div>
            `;
        }
        else if(k == 1)
        {
            card = `
                <div class="card" style="grid-area: c${idx+1}">
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
                <div class="card skill" style="grid-area: c${idx+1}">
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

appendCards(0);