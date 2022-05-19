const screens = document.querySelectorAll(".screen")
const mainBtn = document.querySelector(".main-btn")
const pickInsectBtn = document.querySelectorAll(".pick-insect")
const gameContainer = document.querySelector(".game-container")
const timeEl = document.getElementById("time")
const scoreEl = document.getElementById("score")
const messageEl = document.getElementById("message")
const startMsg = document.querySelector(".start-msg")
let time = 0
let score = 0
let selectedInsect = { }

mainBtn.addEventListener("click", () => {
    screens[0].classList.add("up")
})

pickInsectBtn.forEach(btn =>{
    btn.addEventListener("click", () => {
        const img = btn.querySelector("img")
        const src = img.getAttribute("src")
        const alt = img.getAttribute("alt")
        selectedInsect = { src, alt }
        screens[1].classList.add("up")
        setTimeout( createInsect(), 1000 )  
        startGame()
    })
})

function startGame(){
    setInterval( increaseTimer ,1000)
    startMsg.classList.add("animated")
    setTimeout( removeMsg ,3900)
}

function removeMsg(){
    startMsg.remove()
}

function increaseTimer(){
    let m = Math.floor( time / 60 )
    let s = time % 60
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    time++
}

function createInsect(){
    const insectDiv = document.createElement("div")
    insectDiv.classList.add("insect")
    const { x, y } = getRandomLocation() 
    insectDiv.style.left = `${x}px`
    insectDiv.style.top = `${y}px`
    insectDiv.innerHTML = ` <img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style = "transform : rotate( ${Math.random() * 360}deg )" />  `

    insectDiv.addEventListener("click", catchInsect)

    gameContainer.appendChild(insectDiv)
}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 180
    const y = Math.random() * (height - 200) + 180
    return { x, y }
}

function catchInsect(){
    increaseScore()
    this.classList.add("caught")
    setTimeout(() =>  this.remove() ,2000)
    addMoreInsects()
}

function increaseScore(){
    score++
    if (score > 29){
        messageEl.style.display = "block"
    }

    scoreEl.innerHTML = `Score: ${score}`
}

function addMoreInsects(){
    setTimeout( createInsect, 1000 )
    setTimeout( createInsect, 1500 )
}