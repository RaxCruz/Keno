// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  World = Matter.World,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine
});
console.log(window.innerHeight, window.innerWidth)
render.options.wireframes = false;
render.canvas.width = window.innerWidth / 10
render.canvas.height = window.innerHeight
// create two boxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(0, render.canvas.height / 1.2, 810, render.canvas.height / 18, { isStatic: true, render: { fillStyle: '#fa0', strokeStyle: 'transparent' } });
var machine = Bodies.circle(400, 120, 100, { isStatic: true, render: { fillStyle: '#fa0', strokeStyle: 'transparent' } });
var marginMiddle = Bodies.rectangle(render.canvas.width / 2, window.innerHeight / 2.1, render.canvas.width / 18, render.canvas.height / 1.7, { isStatic: true, render: { fillStyle: '#fa0', strokeStyle: 'transparent' } });
var marginLeft = Bodies.rectangle(0, window.innerHeight / 2.2, render.canvas.width / 10, render.canvas.height / 1.3, { isStatic: true, render: { fillStyle: '#fa0', strokeStyle: 'transparent' } });
var marginRight = Bodies.rectangle(render.canvas.width, window.innerHeight / 2.2, render.canvas.width / 10, render.canvas.height / 1.3, { isStatic: true, render: { fillStyle: '#fa0', strokeStyle: 'transparent' } });
//canvas
function createImage($string, isWin) {

  let drawing = document.createElement("canvas");

  drawing.width = String((render.canvas.width / 2))
  drawing.height = String((render.canvas.width / 2))

  let ctx = drawing.getContext("2d");

  //ctx.fillStyle = "#57c3a5";
  ctx.fillStyle = isWin ? "#ffb6c1" : "#57c3a5"
  //ctx.fillRect(0, 0, 150, 150);
  ctx.beginPath();
  ctx.arc(render.canvas.width / 4, render.canvas.width / 4, render.canvas.width / 6, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = isWin ? "#000" : "#000"
  ctx.font = "10pt sans-serif";
  ctx.textAlign = "center";
  ctx.fillText($string, (render.canvas.width / 4), (render.canvas.width / 3.5));
  // ctx.strokeText("Canvas Rocks!", 5, 130);

  return drawing.toDataURL("image/png");
}
var limit = 20
var intervalID = -1
var winAmout = 0
//function making ball
function makeBall() {
  isWin = false
  if (limit === 0) {
    if (winAmout && coinList[winAmout - 1].textContent !== "-") PriceList[winAmout].classList.add("bg-green-300", "text-black")
    gameStartButton.classList.remove("cursor-not-allowed", "pointer-events-none")
    clearButton.classList.remove("cursor-not-allowed", "pointer-events-none")
    randomPickedButton.classList.remove("cursor-not-allowed", "pointer-events-none")
    NumberPickedButton.forEach((item) => {
      item.classList.remove("cursor-not-allowed", "pointer-events-none")
    })
    return
  }
  clearTimeout(intervalID)
  intervalID = setTimeout(() => makeBall(), 500)
  limit -= 1
  let randomNumber = randomWinNumber[limit]
  console.log(currPickedNumber, randomNumber)
  if (currPickedNumber.includes(String(randomNumber))) {
    isWin = true;
    winAmout += 1
  }
  currPickedNumber.forEach((number) => {
    console.log(number, randomNumber)
    if (Number(number) === randomNumber) NumberPickedButton[randomNumber - 1].classList.add("bg-green-300")
  })

  let ball = Bodies.circle(Math.floor(Math.random() * render.canvas.width / 2 + render.canvas.width / 4), 0, render.canvas.width / 6, {
    restitution: 0.5,
    render: {
      fillStyle: '#000',
      sprite: {
        texture: createImage(String(randomNumber), isWin),


      }
    }
  })

  Composite.add(engine.world, [ball])
}

// add all of the bodies to the world
Composite.add(engine.world, [ground, marginLeft, marginMiddle, marginRight]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

//

gameStartButton.addEventListener('click', () => gameStart())

// run the engine
function gameStart() {
  if (currPickedNumber.length < 2) {
    window.alert("至少選2個 !!")
    return
  }
  winAmout = 0
  World.clear(engine.world);
  Engine.clear(engine);
  Runner.stop(runner)
  Composite.add(engine.world, [ground, marginLeft, marginMiddle, marginRight]);
  limit = 20
  makeBall()

  PriceList.forEach((item) => {
    item.classList.remove("bg-green-300", "text-black");
  })
  NumberPickedButton.forEach((item) => {
    item.classList.remove("bg-green-300")
  })
  console.log("intervalID", intervalID)


  Runner.run(runner, engine);
  clearButton.classList.add("cursor-not-allowed", "pointer-events-none")
  randomPickedButton.classList.add("cursor-not-allowed", "pointer-events-none")
  gameStartButton.classList.add("cursor-not-allowed", "pointer-events-none")
  NumberPickedButton.forEach((item) => {
    item.classList.add("cursor-not-allowed", "pointer-events-none")
  })
}




