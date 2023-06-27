var choices = ["Rock", "Paper", "Scissors"];
function getComputerChoice()
{
    return Math.floor(Math.random() * 3);
}
const positive_mod = (n, m) => {return ((n % m) + m) % m;};
function round(playerSelection, computerSelection)
{
    const outcomes = ['ties with', 'loses to', 'beats'];
    const result = positive_mod((computerSelection - playerSelection), 3);
    let message = `${choices[playerSelection]} ${outcomes[result]} ${choices[computerSelection]}`;
    message += `\nPlayer ${outcomes[result]} Computer!`;
    return message;
}

function game()
{
    let userInput = false;
    let r = 1;
    do {
        console.log('--------------------------------------------------------------------\n')
        console.log(`                                  Round ${r}                           \n`)
        console.log("Let's play some Rock Paper Scissors");
        message = 'Choose an object:\n1. Paper\n2. Rock\n3. Scissors\nYour choice: ';
        playerSelection--;
        console.log(round(playerSelection, getComputerChoice()));
        r++;
        userInput = selection == 1;
    } while(userInput);
}

game();