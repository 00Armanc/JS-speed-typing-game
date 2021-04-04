let mixWords = [
    { text: "yeni", className: "sp"},
    { text: "yasak", className: "sp"},
    { text: "altmış", className: "sp"},
    { text: "klavye", className: "sp"},
    { text: "yatak", className: "sp"},
    { text: "çalışmak", className: "sp"},
    { text: "erken", className: "sp"},
    { text: "lamba", className: "sp"},
    { text: "sabah", className: "sp"},
    { text: "parfüm", className: "sp"},
    { text: "okul", className: "sp"},
    { text: "mektep", className: "sp"},
    { text: "pantolon", className: "sp"},
    { text: "masa", className: "sp"},
    { text: "var", className: "sp"},
    { text: "işe", className: "sp"},
    { text: "odaklanmak", className: "sp"},
    { text: "ne", className: "sp"},
    { text: "oda", className: "sp"},
    { text: "bu", className: "sp"},
    { text: "adam", className: "sp"},
    { text: "kar", className: "sp"},
    { text: "bardak", className: "sp"},
    { text: "ekle", className: "sp"},
    { text: "bal", className: "sp"},
    { text: "öğretmek", className: "sp"},
    { text: "yaşamak", className: "sp"},
    { text: "büyümek", className: "sp"},
    { text: "bakmak", className: "sp"},
    { text: "kodlamak", className: "sp"},
    { text: "hemşire", className: "sp"},
    { text: "polis", className: "sp"},
    { text: "incelemek", className: "sp"},
    { text: "tuş", className: "sp"},
    { text: "içeri", className: "sp"},
    { text: "övmek", className: "sp"},
    { text: "yakalamak", className: "sp"},
    { text: "saptamak", className: "sp"},
    { text: "içerik", className: "sp"},
    { text: "kanal", className: "sp"},
    { text: "tırnak", className: "sp"},
    { text: "kol", className: "sp"},
    { text: "doğuştan", className: "sp"},
    { text: "akıl", className: "sp"}
]



// short way to print
let log = console.log

// Text Side
let textİnput = document.querySelector('.text-input')
let textCols = document.querySelector('.words-list')

let secondBtn = document.querySelector('.second-btn')
let startBtn = document.querySelector('.start-btn')


// Control Side
let allWord = document.querySelector('.all-word-number')
let wrongWord = document.querySelector('.wrong-number')
let allStrike = document.querySelector('.all-strike-number')

// Game control settings
let myInterval, count = 0, time = 20

events()

let target = document.querySelectorAll('.sp')


function mixedWords(el) {
    let j, x, len = el.length

    for(let i = 0; i < len; i++) {
        j = Math.floor(Math.random() * len) // 5
        x = el[i]                           // 1
        el[i] = el[j]                       // 1 = 5
        el[j] = x                           // 5 = 1
    }
    return el
}

function updateWords() {
    var shortWay = mixedWords(mixWords)

    shortWay[0].className = "sp highlight"
    shortWay.forEach(el => {
        let span = document.createElement('span')
        span.className = el.className
        span.innerHTML = el.text
        textCols.append(span)
    })
} 

function startGame() {
    if(textİnput.value.trim() == "") {
        clearInput()
    } else {
        count++
        nextWord()
        clearInput()

        rowStep()
    }
}

function rowStep() {
    let high = document.querySelector('.highlight')

    textCols.style.marginTop = "-"+(high.offsetTop-2)+"px"
}

function changeWrongWordColor() {
    target[count-1].classList.add('wrong')
}

function checkCorrectness() {
    if(target[count].innerHTML.indexOf(textİnput.value.trim())) {
        target[count].classList.add("highlight-wrong")
    } else {
        target[count].classList.remove("highlight-wrong")
    }
}

function nextWord() {
    highlightTurnZero()

    target.forEach(el => el.classList.remove("highlight-wrong"))
    if(target[count-1].innerHTML == textİnput.value.trim()) {
        return
    } else {
        target[count-1].classList.add('wrong')
    }
}


function timer() {
    if(!myInterval) {
        myInterval = setInterval(() => {
            time--
            secondBtn.innerHTML = time
            if(time == 0) {
                time = 60
                resetGame()
            }
        }, 1000)
    } else return 
}

function resetGame() {
    textCols.style.marginTop = "0"
    result()

    clearInterval(myInterval)
    myInterval = false
    
    count = 0
    secondBtn.innerHTML = 60
    target.forEach(el => el.classList.remove('highlight-wrong', 'wrong'))
    
    clearInput()
    highlightTurnZero()
    updateWords()
}

function highlightTurnZero() {
    target.forEach(el => {
        el.classList.remove("highlight")
    })
    target[count].classList.add("highlight")
}

function result() {
    let arr = []
    target.forEach(el => {
        arr.push(el.className.trim().indexOf("wrong"))
    })

    let secondNum = arr.filter(el => el == 3).length
    let firstNum = [...target].slice(0, count)

    let totalLength = 0
    firstNum.forEach(el => {
        totalLength += el.innerHTML.length
    })

    allWord.innerHTML = (firstNum.length - secondNum)
    wrongWord.innerHTML = secondNum
    allStrike.innerHTML = totalLength
}

function clearInput() {
    textİnput.value = ""
}

function events() {
    updateWords()
    textİnput.addEventListener('keyup', (event) => {
        timer()
        checkCorrectness()

        if(event.keyCode == 32) {
            if(target.length-1 == count) {
                resetGame()
            } else {
                startGame()
            }
        }
    })
    startBtn.addEventListener('click', resetGame)
}
