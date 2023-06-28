var choices = ["rock", "paper", "scissors"];
const getComputerChoice = () => { return Math.floor(Math.random() * 3); }
const positive_mod = (n, m) => {return ((n % m) + m) % m;};
function determineWinner(playerSelection, computerSelection)
{
    const result = positive_mod((computerSelection - playerSelection), 3);
    return result;
}

var round = 1, playerWins = 0, AIWins= 0;
buttons = document.querySelectorAll('.player-choice');

const createCards = (playerImage, compImage, matchup) => {
    // Create new Cards for player and AI
    const playerCard = document.createElement('div'), compCard = document.createElement('div');
    playerCard.classList.add('player-card'); compCard.classList.add('computer-card');
    const playerTitle = document.createElement('h2'), compTitle = document.createElement('h2');
    playerCard.appendChild(playerTitle); compCard.appendChild(compTitle);
    const newPlayerImage = document.createElement('img'); const newCompImage = document.createElement('img');
    newPlayerImage.classList.add('player-image'); newCompImage.classList.add('computer-image');
    newPlayerImage.src = playerImage.src; newCompImage.src = compImage.src;
    playerCard.appendChild(newPlayerImage); compCard.appendChild(newCompImage);
    playerTitle.innerText = "You😘"; compTitle.innerText = "AI🤖";
    const versus = document.querySelector('.match h2');
    matchup.insertBefore(playerCard, versus); matchup.appendChild(compCard);
};

const createTable = () => {
    // Add a table
    const table = document.createElement('table');
    const header = document.createElement('tr');
    const headerText = ['Round #', 'You Chose', 'AI Chose', 'Outcome', 'Your Wins', 'Ai Wins', 'Win Ratio'];
    const headerItems = headerText.map((text) => {
        const temp = document.createElement('th');
        temp.innerText=text;
        return temp;
    });
    headerItems.forEach((item) => {header.appendChild(item);});
    table.appendChild(header);
    table.classList.add('results');
    document.querySelector('.round-info').appendChild(table);
};

const createRow = (playerSelection, computerSelection, result) => {
    const toPercent = num => (num * 100).toFixed(2);
    const outcomes = ['T', 'L', 'W'];
    const table = document.querySelector('table');
    const newRow = document.createElement('tr');
    playerWins += result == 2;
    AIWins += result == 1;
    const winRatio = toPercent((playerWins/round)) + '%';
    const rowText = [`${round}`, `${choices[playerSelection]}`, `${choices[computerSelection]}`, `${outcomes[result]}`,
                    `${playerWins}`, `${AIWins}`, `${winRatio}`];
    rowText.forEach((text) => {
        const temp = document.createElement('td');
        temp.innerText = text;
        newRow.appendChild(temp);
    })
    if(table.childElementCount == 1) table.appendChild(newRow);
    else {
        const header = document.querySelector('tr');
        header.insertAdjacentElement('afterend', newRow);
        if (table.childElementCount > 5) table.deleteRow(6);
    }
};

const displayMessage = (result) => {
    const playerMessages = ['Tied', 'Lost', 'WON!!!!!!'];
    let message = document.querySelector('.message');
    if (!message)
    {
        const table = document.querySelector('table');
        message = document.createElement('h2');
        message.classList.add('message');
        table.insertAdjacentElement('beforebegin', message);
    }
    message.innerText = `You ${playerMessages[result]}`;
};
const quit = () => {
    const gameOverModal = document.createElement('div');
    const text = document.createElement('h2');
    if(playerWins > AIWins) text.innerText='YOU WON!!!';
    else if (playerWins < AIWins) text.innerText = 'You Lost';
    else text.innerText = 'You Tied';
    gameOverModal.appendChild(text);
    gameOverModal.classList.add('modal');
    document.querySelector('.content').id = 'gameover';
    const playAgain = document.createElement('button');
    playAgain.innerText = 'Play Again';
    gameOverModal.appendChild(playAgain);
    document.querySelector('body').appendChild(gameOverModal);
    playAgain.addEventListener('click', () => {location.reload();});
}
const addQuitButton = () => {
    const content = document.querySelector('.content');
    const quitButton = document.createElement('button');
    quitButton.innerText = "End Game";
    quitButton.classList.add('quit');
    content.appendChild(quitButton);
    quitButton.addEventListener('click', quit);
}
const playRound = function () {
    const playerSelection = this.id, computerSelection=getComputerChoice();
    // Make the player and computer selection show up in the middle
    const playerImage = document.querySelector(`.${choices[playerSelection]}`), compImage = document.querySelector(`.${choices[computerSelection]}`);
    const matchup = document.querySelector('.match');
    if(matchup.childElementCount == 1) {
        createCards(playerImage, compImage, matchup);
        createTable();
        document.querySelector('.round-info').insertBefore(document.createElement('h2'), matchup).textContent = 'Previous Round';        
    }
    else {
        // Update the image
        const prevPlayerImage = document.querySelector('.player-image'), prevCompImage = document.querySelector('.computer-image');
        prevPlayerImage.src = playerImage.src; prevCompImage.src = compImage.src
    }
    const results = determineWinner(playerSelection, computerSelection);
    createRow(playerSelection, computerSelection, results);
    // Update the scores
    document.querySelector('.player-score').innerText = playerWins;
    document.querySelector('.computer-score').innerText = AIWins;
    if(Math.max(playerWins, AIWins) > 4 && !document.querySelector('.quit'))
    {
        addQuitButton();
    }
    // Display Message
    displayMessage(results);
    document.querySelector('.round').innerText = ++round;
}

buttons.forEach(button => {
    button.addEventListener('click', playRound);
});