const bigBoxes = document.querySelectorAll(".bigBox")
const smallBoxes = document.querySelectorAll(".smallBox")
const restartButton = document.getElementById('restartBtn')
const thongbao = document.getElementById("thongbao")
var currentPlayer = 'X'
thongbao.textContent = `${currentPlayer}'s turn!`
var check = 1
var temp
let running = false
let smallWon = Array(9)
smallWon.fill(false)

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let smallOption = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
]

let bigOption = 
['', '', '', '', '', '', '', '', '']



function resetColor() {
    bigBoxes.forEach(bigBox => bigBox.style.backgroundColor = '#3BB2E2')
    smallBoxes.forEach(smallBox => smallBox.style.backgroundColor = '#3BB2E2')
}

function resetText() {
    smallBoxes.forEach(smallBox => smallBox.textContent = '')
}


gameStart()
function gameStart() {
    smallBoxes.forEach(smallBox => smallBox.addEventListener('click', boxClicked))
    restartButton.addEventListener('click', restart)
    running = true
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'
}

function boxClicked() {
    const smallBoxIndex = this.getAttribute("smallId") // small box selected
    const bigBoxIndex = this.parentElement.id // big box played in
    if (smallOption[bigBoxIndex][smallBoxIndex] != '' || bigBoxIndex != temp && check == 0 || running == 0) {
        return;
    }
    temp = smallBoxIndex
    check = 0
    updateBoard(this, bigBoxIndex, smallBoxIndex)
    checkWinnerSmall(bigBoxIndex, smallWon, bigOption)
    checkWinnerBig(bigBoxIndex)
    changePlayer()
    thongbao.textContent = `${currentPlayer}'s turn!`

    if (!smallOption[smallBoxIndex].includes('')) {
        temp = undefined
        check = 1
        resetColor()
    }
}

function updateBoard(smallBox, bigBoxIndex, smallBoxIndex) {
    smallBox.textContent = currentPlayer
    smallOption[bigBoxIndex][smallBoxIndex] = currentPlayer
    
    console.clear()
    console.log(smallOption)
    
    resetColor()
    bigBoxes[smallBoxIndex].style.backgroundColor = '#1d7a9f'
    document.getElementById(smallBoxIndex).querySelectorAll('.smallBox').forEach(smallBox => smallBox.style.backgroundColor = '#1d7a9f')
}
function checkWinnerSmall(bigBoxIndex, smallWon, bigOption) { 
    
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        let smallBoxA = smallOption[bigBoxIndex][condition[0]]
        let smallBoxB = smallOption[bigBoxIndex][condition[1]]
        let smallBoxC = smallOption[bigBoxIndex][condition[2]]
        
        if (smallBoxA == '' || smallBoxB == '' || smallBoxC == '') {
            continue
        }
        if (smallBoxA == smallBoxB && smallBoxB == smallBoxC && smallWon[bigBoxIndex] == false) { // da co o to thang
            smallWon[bigBoxIndex] = true
            bigOption[bigBoxIndex] = currentPlayer
            document.getElementById(bigBoxIndex).querySelectorAll('.smallBox').forEach(smallBox => {
                const smallBoxId = parseInt(smallBox.getAttribute('smallId')); // Get the smallId and convert to integer
                if (smallBoxId % 2 === 0 && currentPlayer == "X") { // Check if the smallId is even
                    smallBox.style.backgroundColor = '#07699b'; // Apply the color
                }
                else if (smallBoxId != 4 && currentPlayer == "O") {
                    smallBox.style.backgroundColor = '#07699b'
                }
            })
            break
        }
    }
    console.log(smallWon)
    console.log(bigOption)
}

function checkWinnerBig() {
    let bigWon = false

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        let bigBoxA = bigOption[condition[0]]
        let bigBoxB = bigOption[condition[1]]
        let bigBoxC = bigOption[condition[2]]
        
        if (bigBoxA == '' || bigBoxB == '' || bigBoxC == '') {
            continue;
        }
        if (bigBoxA == bigBoxB && bigBoxB == bigBoxC) {
            bigWon = true
            break
        }
    }
    if (bigWon) {
        console.log(`${currentPlayer} wins! `)
        running = 0
    }
    else if (!bigOption.includes('')) {
        thongbao.textContent = "DRAW!"
        running = 0
    }
    console.log(bigWon)
}


function restart() {    
    smallWon.fill(false)
    smallOption = [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
    ]
    bigOption = 
        ['', '', '', '', '', '', '', '', '']
    currentPlayer = 'X'
    thongbao.textContent = `${currentPlayer}'s turn!`
    temp = undefined
    check = 1
    resetText()
    resetColor()
    console.clear()
    running = true
}


