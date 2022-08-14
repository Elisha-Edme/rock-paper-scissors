var choices = ["Paper", "Rock", "Scissors"];
function randInt(min = 0, max)
{
    min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
function getComputerChoice()
{
    return randInt(0, 3);
}

function round(playerSelection, computerSelection)
{
    let message = 'You'
    var lost, sentence;
    let max = Math.max(playerSelection, computerSelection);
    let min = Math.min(playerSelection, computerSelection);
    console.log(max, min);
    if (max == min)
    {
        return 'You tie!'
    }
    else if (Math.abs(max - min) == 1)
    {
        lost = playerSelection == max;
        
        sentence =`${choices[min]} beats ${choices[max]}.`
    }
    else
    {
        lost = playerSelection == min;
        sentence = 'Scissors beats Paper';
    }
    message = `${message} ${lost?'Lose!':'Win!'} ${sentence}`;
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
        let playerSelection = Number(prompt(message));
        playerSelection--;
        console.log(typeof playerSelection)
        console.log(round(playerSelection, getComputerChoice()));
        r++;
        selection = Number(prompt('Do you want to play again?\n1. Yes\n2. No'));
        userInput = selection == 1;
    } while(userInput);
}

game();