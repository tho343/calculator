const buttons = document.querySelectorAll('button');
const calculatorDisplay = document.querySelector('.calculator-display h1');
const clearBtn = document.getElementById('clear-btn');
const decimalBtn  = document.getElementById('decimal');

let firstValue = 0;
let currentOperator = '';
let awaitingNextVal = false;

//display number on screen
function displayNum(number){
    //replace the number if first value is entered
    if(awaitingNextVal){
        calculatorDisplay.textContent = number;
        awaitingNextVal = false;
    } else{
        //if current number is 0, replace it, if not add a number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent  = displayValue === '0' ? number : displayValue + number;
    }

}
function addDecimal(){
    //if operator pressed, dont add decimal
    if(awaitingNextVal){
        return;
    }
    //if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//calculate first and second value depending on operator 
const calculate ={
    '/' : (firstNumber,secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber,secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber,secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber,secondNumber) => firstNumber - secondNumber,
    '=' : (firstNumber,secondNumber) => secondNumber
}

function useOperator(operator){
    const currentNumber = Number(calculatorDisplay.textContent);
    //prevent mutiple operators
    if(operator && awaitingNextVal){
        currentOperator = operator;
        return;
    }
    //assign firstValue if no value
    if(!firstValue){
        firstValue = currentNumber;
    } else{
        console.log(firstValue, currentOperator,currentNumber);
        const calculation = calculate[currentOperator](firstValue,currentNumber);
        console.log(calculation);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextVal = true;
    currentOperator = operator;
    
    
}
//delete one digit 
function deleteDigit(){
    const updateNumber = calculatorDisplay.textContent.slice(0,-1);
    if(calculatorDisplay.textContent.length === 1){
        calculatorDisplay.textContent = '0';
    } else{
        calculatorDisplay.textContent = updateNumber;
    }
}

buttons.forEach((btn)=>{
    if(btn.classList.length === 0){
        btn.addEventListener('click',()=>displayNum(btn.value));
    } else if(btn.classList.contains('operator')){
        btn.addEventListener('click', ()=> useOperator(btn.value));
    } else if(btn.classList.contains('del')){
        btn.addEventListener('click',()=>deleteDigit());
    } else if(btn.classList.contains('decimal')){
        btn.addEventListener('click',()=>addDecimal());
    }
})
//clear what on screen
function clearScreen(){
firstValue = 0;
operator = '';
awaitingNextVal = false;
    calculatorDisplay.textContent = '0';
}   

clearBtn.addEventListener('click',clearScreen);

