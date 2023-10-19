const previousInput = document.querySelector('.previous-input');
const currentInput = document.querySelector('.current-input');
const numberButtons = document.querySelectorAll('.number-btn');
const acBtn = document.querySelector('.ac-btn');
const delBtn = document.querySelector('.del-btn');
const equalBtn = document.querySelector('.equal-btn');
const operatorButtons = document.querySelectorAll('.op-btn');
let numbers = [];
let numbersIndex = 0;
let operators = [];
let operatorsIndex = 0;
let result = 0;

// Functions
const calculate = (a,b,op) => {
    let result = 0;
    if(b==0 && op=='/'){
        previousInput.value = '';
        currentInput.value = 'Error';
    }
    else{
        result = eval(a+op+b);
    }
    return result;
}

previousInput.value = '';
currentInput.value = '';

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentInput.value += button.textContent;
        if(!numbers[numbersIndex]){
            numbers[numbersIndex] = '';
        }
        console.log(numbers);
        console.log(currentInput.value);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        previousInput.value = previousInput.value + currentInput.value + button.textContent;
        evaluatedString = previousInput.value;
        if(previousInput.value && ( previousInput.value[previousInput.value.length-2] == '+' || previousInput.value[previousInput.value.length-2] == '-' || previousInput.value[previousInput.value.length-2] == '*' || previousInput.value[previousInput.value.length-2] == '/')){
            operators[operatorsIndex-1] = button.textContent;
        }
        else{
            numbers[numbersIndex] = currentInput.value;
            numbersIndex++;
            operators[operatorsIndex] = button.textContent;
            operatorsIndex++;
        }
        currentInput.value = '';
    });
})

acBtn.addEventListener('click', () => {
    previousInput.value = '';
    currentInput.value = '';
    evaluatedString = '';
    numbers = [];
    operators = [];
    numbersIndex = 0;
    operatorsIndex = 0;
});

delBtn.addEventListener('click', () => {
    if(currentInput.value.length > 0){
        currentInput.value = currentInput.value.slice(0, -1);
    }
    else{
        currentInput.value = previousInput.value.slice(0, -1);
        previousInput.value = '';
    }

});

equalBtn.addEventListener('click', () => {
    previousInput.value += currentInput.value;
    numbers[numbersIndex] = currentInput.value;

    while(operators.includes('*') || operators.includes('/')){
        for(let i=0; i<operators.length; i++){
            if(operators[i] == '*' || operators[i] == '/'){
                numbers[i] = calculate(numbers[i], numbers[i+1], operators[i]);
                numbers.splice(i+1, 1);
                operators.splice(i, 1);
                i--;
            }
        }
    }

    for(let i=0; i<numbers.length-1; i++){
        numbers[i+1] = calculate(numbers[i], numbers[i+1], operators[i]);
    }
    result = numbers[numbers.length-1];
    numbers = [];
    operators = [];
    numbersIndex = 0;
    operatorsIndex = 0;
    previousInput.value = '';
    currentInput.value = result;
});