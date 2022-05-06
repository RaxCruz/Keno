console.log(window.innerWidth)
const hintSection = document.querySelector("#hintSection");
const gameSection = document.querySelector("#gameSection");
let portrait = window.matchMedia("(orientation: portrait)");

portrait.addEventListener("change", function (e) {
  if (e.matches) {
    hintSection.classList.remove("hidden")
  } else {
    hintSection.classList.add("hidden")

    window.location.reload()
  }
})
if (window.matchMedia("(orientation: portrait)").matches) {
  hintSection.classList.remove("hidden")
  //gameSection.classList.add()
}
if (window.matchMedia("(orientation: landscape)").matches) {
  hintSection.classList.add("hidden")
  //gameSection.classList.add("")
}
NumberPickedList = Array(80).fill(1).map((value, index) => ({ number: index + 1, isSelected: false }))
// [
//   { number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }, { number: 7 }, { number: 8 }, { number: 9 }, { number: 10 },
//   { number: 11 }, { number: 12 }, { number: 13 }, { number: 14 }, { number: 15 }, { number: 16 }, { number: 17 }, { number: 18 }, { number: 19 }, { number: 20 },
//   { number: 21 }, { number: 22 }, { number: 23 }, { number: 24 }, { number: 25 }, { number: 26 }, { number: 27 }, { number: 28 }, { number: 29 }, { number: 30 },
//   { number: 31 }, { number: 32 }, { number: 33 }, { number: 34 }, { number: 35 }, { number: 36 }, { number: 37 }, { number: 38 }, { number: 39 }, { number: 40 },
//   { number: 41 }, { number: 42 }, { number: 43 }, { number: 44 }, { number: 45 }, { number: 46 }, { number: 47 }, { number: 48 }, { number: 49 }, { number: 50 },
//   { number: 51 }, { number: 52 }, { number: 53 }, { number: 54 }, { number: 55 }, { number: 56 }, { number: 57 }, { number: 58 }, { number: 59 }, { number: 60 },
//   { number: 61 }, { number: 62 }, { number: 63 }, { number: 64 }, { number: 65 }, { number: 66 }, { number: 67 }, { number: 68 }, { number: 69 }, { number: 70 },
//   { number: 71 }, { number: 72 }, { number: 73 }, { number: 74 }, { number: 75 }, { number: 76 }, { number: 77 }, { number: 78 }, { number: 79 }, { number: 80 },
// ]
let ButtonPickedlimit = 10
let currPickedNumber = []
let randomWinNumber = shuffleArray(Array(80).fill(1).map((value, index) => (index + 1))).slice(0, 20)
const gameStartButton = document.querySelector('#gameStart')
const NumberPickedSection = document.querySelector('#NumberPickedSection')
const randomPickedButton = document.querySelector('#randomPickedButton')
const PriceList = document.querySelectorAll('li')
const clearButton = document.querySelector('#clearButton')
const coinList = document.querySelectorAll('.coin')

clearButton.addEventListener('click', () => handleClearButton())
randomPickedButton.addEventListener('click', () => handleRandomPickedButton())
NumberPickedList.forEach((item) => {
  addNumberPickedButton(item.number)
})
const NumberPickedButton = document.querySelectorAll('.numberPickedButton')
NumberPickedButton.forEach((item) => {
  item.addEventListener('click', () => handleNumberPickedButtonClick(item.textContent))
})
//插入80個按鈕
function addNumberPickedButton(number) {
  var newButton = document.createElement("button");
  var newContent = document.createTextNode(number);
  newButton.classList.add("bg-black-500", "border", "w-[10%]", "h-[12.5%]", "numberPickedButton", "text-white")
  newButton.appendChild(newContent); //add the text node to the newly created div.
  NumberPickedSection.append(newButton)
}
//按鈕觸發處理
function handleNumberPickedButtonClick(number) {

  const index = number - 1
  if (NumberPickedList[index].isSelected) {
    NumberPickedList[index].isSelected = false
    currPickedNumber = currPickedNumber.filter(function (number) { return number !== String(NumberPickedList[index].number) })
    NumberPickedButton[index].classList.remove("bg-yellow-600")
    updatePriceList()
    return
  }
  if (currPickedNumber.length >= ButtonPickedlimit) return
  currPickedNumber.push(number)
  updatePriceList()
  NumberPickedList[index].isSelected = true
  NumberPickedButton[index].classList.add("bg-yellow-600")
}
function handleRandomPickedButton() {
  handleClearButton()
  currPickedNumber = shuffleArray(Array(80).fill(1).map((value, index) => String(index + 1))).slice(0, 10);
  currPickedNumber.forEach((number) => {
    const index = Number(number - 1)
    NumberPickedList[index].isSelected = true
    NumberPickedButton[index].classList.add("bg-yellow-600")
  })
  currPickedNumber.length = 10
  ButtonPickedlimit = 0
  updatePriceList()
}
function handleClearButton() {
  NumberPickedButton.forEach((item) => {
    item.classList.remove("bg-green-300")
  })
  PriceList.forEach((item) => {
    item.classList.remove("bg-green-300", "text-black");
  })
  currPickedNumber.forEach((number) => {
    const index = Number(number - 1)
    NumberPickedButton[index].classList.remove("bg-yellow-600")
  })
  coinList.forEach((item, index) => {
    item.textContent = "-"
  })
  currPickedNumber = []
  currPickedNumber.length = 0
  ButtonPickedlimit = 10
  updatePriceList()
}
//隨機生成不重複Array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function updatePriceList() {
  coinList.forEach((item, index) => {
    item.textContent = "-"
    switch (currPickedNumber.length) {
      case 2:
        if (index === 0) item.textContent = "1"
        if (index === 1) item.textContent = "5"
        break;
      case 3:
        if (index === 1) item.textContent = "3"
        if (index === 2) item.textContent = "20"
        break;
      case 4:
        if (index === 1) item.textContent = "1"
        if (index === 2) item.textContent = "5"
        if (index === 3) item.textContent = "100"
        break;
      case 5:
        if (index === 1) item.textContent = "1"
        if (index === 2) item.textContent = "2"
        if (index === 3) item.textContent = "10"
        if (index === 4) item.textContent = "200"
        break;
      case 6:
        if (index === 2) item.textContent = "1"
        if (index === 3) item.textContent = "5"
        if (index === 4) item.textContent = "50"
        if (index === 5) item.textContent = "400"
        break;
      case 7:
        if (index === 2) item.textContent = "1"
        if (index === 3) item.textContent = "5"
        if (index === 4) item.textContent = "15"
        if (index === 5) item.textContent = "250"
        if (index === 6) item.textContent = "800"
        break;
      case 8:
        if (index === 2) item.textContent = "1"
        if (index === 3) item.textContent = "5"
        if (index === 4) item.textContent = "10"
        if (index === 5) item.textContent = "50"
        if (index === 6) item.textContent = "400"
        if (index === 7) item.textContent = "1500"
        break;
      case 9:
        if (index === 2) item.textContent = "1"
        if (index === 3) item.textContent = "5"
        if (index === 4) item.textContent = "10"
        if (index === 5) item.textContent = "25"
        if (index === 6) item.textContent = "250"
        if (index === 7) item.textContent = "2500"
        if (index === 8) item.textContent = "5000"
        break;
      case 10:
        if (index === 3) item.textContent = "2"
        if (index === 4) item.textContent = "5"
        if (index === 5) item.textContent = "12"
        if (index === 6) item.textContent = "50"
        if (index === 7) item.textContent = "300"
        if (index === 8) item.textContent = "2500"
        if (index === 9) item.textContent = "10000"
        break;
      default:
        break;
    }
  })
}
