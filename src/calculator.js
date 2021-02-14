let currentOperation = '';
const display = document.querySelector('.calc-display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalsSign = document.querySelector('.equals');
const allClear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

function add(...args) {
    return args.reduce((a, b) => a + b)
}

function subtract(...args) {
    return args.reduce((a, b) => a - b)
}

function multiply(...args) {
    return args.reduce((a, b) => a * b)
}

function divide(...args) {
    return args.reduce((a, b) => a / b)
}

function operate(a, b, operator) {

    switch (operator) {

        case '+':
            return add(a, b)
            break;

        case '-':
            return subtract(a, b)
            break;

        case 'x':
            return multiply(a, b)
            break;
        case '÷':
            return divide(a, b)
            break;
    }

}

function splitOperation(operationString) {
    return operationString.toString().split(' ');
}

function evaluate(operation) {
    const operationArr = splitOperation(operation);
    if (operationArr.length > 1) {
        const nums = [Number(operationArr[0]), Number(operationArr[2])];
        const operator = operationArr[1];
        if (operator == '÷' && nums[1] == 0) {
            return 'Nope!'
        }
        const result = operate(nums[0], nums[1], operator);
        const roundedResult = Math.round(result * 10) / 10;
        return roundedResult
    }
    return '';
}

function clear() {
    currentOperation = '';
    display.textContent = '0';
}

function nope(expressionResult) {
    if (expressionResult == 'Nope!') {
        display.textContent = expressionResult;
        clear();
    }
}

function setDisplayValue(value) {
    return (value != '') ? value : '0';
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        currentOperation += number.textContent;
        display.textContent = currentOperation;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        let operatorValue = operator.textContent;
        if (splitOperation(currentOperation).length < 3) {
            currentOperation += (currentOperation != '') ? ` ${operatorValue} ` : '';
            display.textContent = setDisplayValue(currentOperation);
        } else {
            let expressionResult = evaluate(currentOperation);
            nope();
            currentOperation = `${expressionResult} ${operatorValue} `;
            display.textContent = currentOperation;
        }
    });
});

equalsSign.addEventListener('click', () => {
    let expressionResult = evaluate(currentOperation);
    if (expressionResult !== null) {
        nope();
        display.textContent = setDisplayValue(expressionResult);
        currentOperation = expressionResult;
    }
});

allClear.addEventListener('click', () => clear());

backspace.addEventListener('click', () => {
    if (currentOperation !== '') currentOperation = currentOperation.toString().slice(0, -1);
    display.textContent = setDisplayValue(currentOperation);
});