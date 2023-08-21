var errors=0
var cardsList=[
  'Cannelloni','Conchiglie','Ditaloni','Fettuccine','Macaroni',
  'Pipe','Ravioli','Rigatoni','Ruote','Tagliatelle'
]

var cardSet;
var board=[];
var rows=5;
var cols=4;
var matchPairs=0
var countdown=60;

window.onload=function(){
  shuffleCards()
  setGame()
  startTimer()
}

function shuffleCards(){
  allCards=cardsList.concat(cardsList)
  // shuffle
  for (let i=0;i<allCards.length;i++){
    let j=Math.floor(Math.random()*allCards.length)
    let temp=allCards[i]
    allCards[i]=allCards[j]
    allCards[j]=temp
  }
}

function setGame(){
  for (let r=0;r<rows;r++){
    let row=[]
    for (let c=0;c<cols;c++){
      let cardImg=allCards.pop()
      row.push(cardImg)

      let card=document.createElement('img')
      card.id=r.toString()+'-'+c.toString()
      card.src='../pics/'+cardImg+'.png'
      card.classList.add('card')
      document.getElementById('board').append(card)
      card.addEventListener('click',selectCard)
    }
    board.push(row)
  }
  setTimeout(hideCards,5000)
  
}


function hideCards(){
  for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
      let card=document.getElementById(i.toString()+'-'+j.toString())
      card.src='../pics/back.png'
    }
  }
}

var selectedCard1;
var selectedCard2;
function selectCard(){
  if (this.src.includes('back')){
    if (!selectedCard1){
      selectedCard1=this
      let coords=selectedCard1.id.split('-')
      let r=parseInt(coords[0])
      let c=parseInt(coords[1])

      selectedCard1.src='../pics/'+board[r][c]+'.png'
    }else if(!selectedCard2 && this!=selectedCard1){
      selectedCard2=this
      let coords=selectedCard2.id.split('-')
      let r=parseInt(coords[0])
      let c=parseInt(coords[1])

      selectedCard2.src='../pics/'+board[r][c]+'.png'
      setTimeout(update,1000)

    }
  }
}
function update(){
  if (selectedCard1.src!=selectedCard2.src){
    selectedCard1.src='../pics/back.png'
    selectedCard2.src='../pics/back.png'
    errors+=1
    document.getElementById('errors').textContent=errors
  }else{
    matchPairs+=1
  }
  if (matchPairs==cardsList.length){
    return finishGame()
  }
  selectedCard1=null
  selectedCard2=null
}

function startTimer() {
  timerInterval = setInterval(function() {
    countdown--; 
    document.getElementById('timer').textContent = countdown; 
    if (countdown === 0) {
      clearInterval(timerInterval); 
      handleTimeout();
    }
  }, 4000); 
}

function handleTimeout() {
  alert("Time's up! Game over.");
  for (let i=0;i<rows;i++){
    for (let j=0;j<cols;j++){
      let card=document.getElementById(i.toString()+'-'+j.toString())
      card.src='../pics/pastaBreak.jpeg'
    }
  }
}


function finishGame(){
  clearInterval(timerInterval)
  let background=document.getElementById('part1')
  background.classList.add('body_blur')
  document.getElementById('first_sentence').classList.add('first');
  document.getElementById('second_sentence').classList.add('second');
  document.getElementById('third_sentence').classList.add('third');
  document.getElementById('forth_sentence').classList.add('forth');
  document.getElementById('break').classList.add('show_break')
}


