/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



let scores, roundScores, activePlayer, dice;

function $(selector){
    return document.querySelector(selector)
}

function $text(selector, text){
    return document.querySelector(selector).textContent = text
}
function $id(selector){
    return document.getElementById(selector)
}

function $idText(selector, text){
    return document.getElementById(selector).textContent = text
}

init()

$idText('current-'+activePlayer, dice)

// -----------------
// On btn-roll click
// -----------------

function btnRoll(){
// 1. Random number
    dice = Math.floor(Math.random() * 6) + 1
    console.log(`rolled `+dice)

// 2. Display result
    let diceDOM = $('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = 'dice-'+dice+'.png'

// 3. Update the round score IF the rolled number was NOT 1
    if(dice !== 1){
        // Add score
        roundScore += dice
        $idText('current-'+activePlayer, roundScore)
    }  
// 4. Next player
    else {
        nextPlayer()
    }
}

// -----------------
// On btn-hold click
// -----------------

function btnHold(){

// 1. Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

// 2. Update UI
    $idText('score-'+activePlayer, scores[activePlayer])
    

// 3. Check if player won the game
    if (scores[activePlayer] >= 20){
        $idText('name-'+activePlayer, 'WINNER!')
        $('.dice').style.display = 'none'
        $('.player-'+activePlayer+'-panel').classList.toggle('winner');
        $('.player-'+activePlayer+'-panel').classList.toggle('active');
    }

// 4. Next player
    else {
        nextPlayer()
    }
}



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    // Set roundscore to 0
    roundScore = 0
    $idText('current-0', '0')
    $idText('current-1', '0')

    // Update active player UI
    $('.player-0-panel').classList.toggle('active')
    $('.player-1-panel').classList.toggle('active')

    $('.dice').style.display = 'none'
}

function init(){
    scores = [0,0]
    roundScore = 0
    activePlayer = 0

    $('.dice').style.display = 'none'

    $idText('score-0','0')
    $idText('score-1','0')
    $idText('current-0','0')
    $idText('current-1','0')

    $idText('name-0', 'Player 1')
    $idText('name-1', 'Player 2')

    $('.player-0-panel').classList.remove('winner');
    $('.player-1-panel').classList.remove('winner');
    $('.player-0-panel').classList.remove('active');
    $('.player-1-panel').classList.remove('active');
    $('.player-0-panel').classList.add('active');
}


$('.btn-roll').addEventListener('click', btnRoll)
$('.btn-hold').addEventListener('click', btnHold)
$('.btn-new').addEventListener('click', init)
