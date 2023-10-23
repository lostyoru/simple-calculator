const previousInput = document.querySelector('.previous-input');
const currentInput = document.querySelector('.current-input');
const numberButtons = document.querySelectorAll('.number-btn');
const acBtn = document.querySelector('.ac-btn');
const delBtn = document.querySelector('.del-btn');
const equalBtn = document.querySelector('.equal-btn');
const operatorButtons = document.querySelectorAll('.op-btn');
let numbers = [];
let operators = [];
let result = 0;

// Functions
const calculate = (a,b,op) => {
    let result = 0;
    if(b==0 && op=='/'){
        previousInput.value = '';
        currentInput.value = 'Error';
        throw new Error('Division by zero');
    }
    else{
        // to avoid floating point errors
        if(op == '+' || op == '-'){
            result = eval(a*1000000+op+b*1000000)/1000000;
        } 
        else{
            result = op == '*' ? eval(a*10+op+b*10)/100 : eval(a*10+op+b*10);
        }
    }
    return result;
}

previousInput.value = '';
currentInput.value = '';

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(!(button.textContent == '.' && currentInput.value.includes('.'))){
            currentInput.value += (currentInput.value == '' && button.textContent == '.' ) ? `0${button.textContent}` : button.textContent;
        }
    });
});

operatorButtons.forEach(button => {
    console.log(numbers);
    button.addEventListener('click', () => {
        if(currentInput.value[currentInput.value.length -1 ] == '+' || currentInput.value[currentInput.value.length -1 ] == '-' ||currentInput.value[currentInput.value.length -1 ] == '*'|| currentInput.value[currentInput.value.length -1 ] == '/'){
            currentInput.value = currentInput.value.slice(0,-1) + button.textContent
        }
        else if(!currentInput.value == ''){
            console.log(currentInput.value);
            if(!(currentInput.value == '' && previousInput.value == '')){
                previousInput.value += currentInput.value + button.textContent;
            };
            currentInput.value = '';
        }
        else{
            if(previousInput.value.length > 0){
                previousInput.value = previousInput.value.slice(0, -1) + button.textContent;
            }
        }
    });
})

acBtn.addEventListener('click', () => {
    previousInput.value = '';
    currentInput.value = '';
    numbers = [];
    operators = [];
    numbersIndex = 0;
    operatorsIndex = 0;
});

delBtn.addEventListener('click', () => {
    if(currentInput.value == 'Error'){
        currentInput.value = '';
    }
    else {
        if(currentInput.value.length > 0){
            currentInput.value = currentInput.value.slice(0, -1);
        }
        else{
            currentInput.value = previousInput.value.slice(0, -1);
            previousInput.value = '';
        }
}

});

equalBtn.addEventListener('click', () => {
    if(!(currentInput.value.includes('+') && currentInput.value.includes('-') && currentInput.value.includes('*') && currentInput.value.includes('/'))){
        previousInput.value += currentInput.value;
    } 
    numbers = previousInput.value.split(/[+*\/-]/);
    numbers = numbers.filter(num => !isNaN(num));
    operators = previousInput.value.split(/[0-9.]/);
    operators = operators.filter(op => op);
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
        try{
            numbers[i+1] = calculate(numbers[i], numbers[i+1], operators[i]);
        }
        catch(err){
            console.log(err);
            currentInput.value = 'Error';
            return;
        }
    }

    result = numbers[numbers.length-1];
    numbers = [];
    operators = [];
    previousInput.value = '';
    currentInput.value = result;
});