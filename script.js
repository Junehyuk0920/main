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
        ["https://dummyimage.com/600x400/000/fff", "Web OS (개발 중)", "순수 HTML, CSS, JS만을 활용한 Windows 11 운영체제의 디자인과 응용 소프트웨어를 체험 할 수 있는 웹사이트"],
        ["./images/face.png", "실시간 얼굴 인식기", "파이썬의 OpenCV, dlib, NumPy, Flask를 활용하여 웹캠 영상에서 실시간으로 얼굴을 탐지하는 실시간 얼굴 탐지 시스템"],
        ["./images/chatbot.png", "JH 챗봇 (카카오톡 챗봇)", "MusicBrainz API를 활용해 가수의 노래 정보를 실시간으로 추출하고, 사용자 요청에 맞춰 노래를 제공하는 카카오톡 음악 검색 챗봇"],
        ["./images/invest.png", "JH Invest", "가상의 프로그램 \"JH Invest\"를 소개하는 간단한 웹사이트"],
        ["https://dummyimage.com/600x400/000/fff", "Online Museum", "대한민국의 유명 고대 유물들을 전시하는 압도감 있는 웹사이트, 유물의 상세한 설명과 검색 기능도 제공함"],
        ["https://dummyimage.com/600x400/000/fff", "JH SNS (개발 중단)", "PHP와 MySQL를 활용한 SNS 웹사이트<br>(기능 : 계정 관리, 미디어 업로드, 개인 메시지 등)"],
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
                            <button>Detail <i class="ph ph-arrow-right"></i></button>
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

appendCards(0);