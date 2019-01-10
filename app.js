console.log("JS working");

const pokeCards =[
    {
    name: "Bulbasaur",
    damage: 60
  }, {
    name: "Caterpie",
    damage: 40
  }, {
    name: "Charmander",
    damage: 60
  }, {
    name: "Clefairy",
    damage: 50
  }, {
    name: "Jigglypuff",
    damage: 60
  }, {
    name: "Mankey",
    damage: 30
  }, {
    name: "Meowth",
    damage: 60
  }, {
    name: "Nidoran - female",
    damage: 60
  }, {
    name: "Nidoran - male",
    damage: 50
  }, {
    name: "Oddish",
    damage: 40
  }, {
    name: "Pidgey",
    damage: 50
  }, {
    name: "Pikachu",
    damage: 50
  }, {
    name: "Poliwag",
    damage: 50
  }, {
    name: "Psyduck",
    damage: 60
  }, {
    name: "Rattata",
    damage: 30
  }, {
    name: "Squirtle",
    damage: 60
  }, {
    name: "Vulpix",
    damage: 50
  }, {
    name: "Weedle", 
    damage: 40
  }
]

const player = {
    score: 0,
    playersHand: [],
    playedCards: [],
    playerScoreUpdate(){
        this.score ++;
    }

}

const computer = {
    score: 0,
    computersHand: [],
    playedCards: [],
    computerScoreUpdate (){
        this.score ++;
    }
}

let playerPlayedCards = [];

let computerPlayedCards = [];

let removeCards = [];

let winner = [];

let computerWins = [];

let round = 1;


let shuffleCard = pokeCards.map(function (card){
    return {
        name: card.name,
        damage: card.damage
    };
});


let pickRandomCard = () => {
    let randomCard = Math.floor(Math.random() * shuffleCard.length);
    return shuffleCard.splice(randomCard, 1)[0];
}

const computerRandomCards = () => {
    while(computer.computersHand.length < 3){
        computer.computersHand.push(pickRandomCard())[0];
    }
}

const playerRandomCards = () => {
    while(player.playersHand.length < 3){
        player.playersHand.push(pickRandomCard())[0];
    }
}


let gameBattle = () => {
    if(playerPlayedCards[0].damage > computerPlayedCards[0].damage){
        player.playerScoreUpdate()
        alert("You won!!");
    }
    else if(playerPlayedCards[0].damage < computerPlayedCards[0].damage){
        computer.computerScoreUpdate()
        alert("You lost!!");
    }
    else{
        alert("You Tied")
    }
    removeCards.push(playerPlayedCards)[0];
    removeCards.push(computerPlayedCards)[0];
    playerPlayedCards.pop();
    computerPlayedCards.pop();
    $(".scoreBoard").text(`Your Score :${player1.score} Computer Score :${computer.score}`);

}

let computercards = () => {
    comcards = Math.floor(Math.random() * computer.computersHand.length);
    return computer.computersHand.splice(comcards, 1)[0];
}

const pushToComputer = () => {
    while(computerPlayedCards.length < 1){
        computerPlayedCards.push(computercards())[0];
    }
}


let gameStart = () => {
    pushToComputer();
    playerRandomCards();
    computerRandomCards();
}

const roundWon = () => {
    if(player.score > computer.score){
        alert("You won the round");
        winner++;
    }
    else if(player.score < computer.score){
        alert("You lost the round");
        computerWins++
    }
    round++
    $(".roundsWon").text(`current round is :${round} Rounds Won :${winner} Computer Wins :${computerWins}`);
    resetScore()
}

const resetScore = () =>{
    player.score = 0;
    computer.score = 0;
}

const gameOver = () =>{
    if(shuffleCard <= 0){
        alert("Game over, play again")
    }
}

const alreadyPlayedCards = () => {
    if(removeCards.length % 6 === 0 && removeCards.length % 12 !== 0){
        player.playersHand.pop();
        player.playersHand.pop();
        player.playersHand.pop();
        playerRandomCards();
        computerRandomCards();
        roundWon()
        $(".card1").text(`${player.playersHand[0].name} ${player.playersHand[0].damage}`);
        $(".card2").text(`${player.playersHand[1].name} ${player.playersHand[1].damage}`);
        $(".card3").text(`${player.playersHand[2].name} ${player.playersHand[2].damage}`);

    }
    else if(removeCards.length % 12 === 0){
        player.playersHand.pop();
        player.playersHand.pop();
        player.playersHand.pop();
        computerRandomCards();
        playerRandomCards();
        roundWon();
        $(".card1").text(`${player.playersHand[0].name} ${player.playersHand[0].damage}`);
        $(".card2").text(`${player.playersHand[1].name} ${player.playersHand[1].damage}`);
        $(".card3").text(`${player.playersHand[2].name} ${player.playersHand[2].damage}`);
    }
    gameOver();
}

const playercard1 = () =>{
    player.playersHand.splice(0, 1, []);
}

const playercard2 = () =>{
    player.playersHand.splice(1, 1, []);
}

const playercard3 = () => {
    player.playersHand.splice(2, 1, []);

}


$(".card1").click(function (){
    const addCards = () =>{
        playerPlayedCards.push(player.playersHand[0]);
    }
    addCards();
    //alert (`you played ${playerPlayedCards[0].name} and the computer played ${computerPlayedCards[0].name}`);
    gameBattle();
    playercard1();
    alreadyPlayedCards();
    pushToComputer();

});

$(".card2").click(function (){
    const addCards = () =>{
        playerPlayedCards.push(player.playersHand[1]);
    }
    addCards();
    //alert (`you played ${playerPlayedCards[0].name} and the computer played ${computerPlayedCards[0].name}`);
    gameBattle();
    playercard2();
    alreadyPlayedCards();
    pushToComputer();

});

$(".card3").click(function (){
    const addCards = () =>{
        playerPlayedCards.push(player.playersHand[2]);
    }
    addCards();
    //alert (`you played ${playerPlayedCards[0].name} and the computer played ${computerPlayedCards[0].name}`);
    gameBattle();
    playercard3();
    alreadyPlayedCards();
    pushToComputer();

});

$(".all").click(function () {
    gameStart();
    $(".card1").text(`${player.playersHand[0].name} ${player.playersHand[0].damage}`);
    $(".card2").text(`${player.playersHand[1].name} ${player.playersHand[1].damage}`);
    $(".card3").text(`${player.playersHand[2].name} ${player.playersHand[2].damage}`);
    console.log("started the game");
});



//138
