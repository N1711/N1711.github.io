const calculator = {                                                                                                                                                                            //I prefer to define the validation check as an object and
    displayValue: 0,                                                                                                                                                                            //access its values later, rather than many individual declarations
    firstValue: null,
    isSecondValue: false,
    secondValue: null,
    action: null
}; 

let txtDisplay = document.querySelector('#display');
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const actions = ['/', '*', '+', '-'];
let isAction = false;
let isNum = false;
let currAction = "";

function UpdateDisplay() {                                                                                                                                                                      //update the display after each keypress
    (calculator.displayValue.toString().length <= 10) ? txtDisplay.innerText = calculator.displayValue : txtDisplay.innerText = calculator.displayValue.toString().substring(0,10);             //limit to 10 characters on the display to avoid numbers spilling out of the container
}

function keyPress(num) {                                                                                                                                                                        //what happens when you press any key on the calculator
    if(num === 'C') { 
        calculator.displayValue = 0;
        calculator.firstValue = null;
        calculator.isSecondValue = false;
        calculator.action = null;
    }
    else if(num === '.') {
        if(!calculator.displayValue.includes(num)) calculator.displayValue += num;
    }
    else if(num === 'changeSign') calculator.displayValue = parseFloat(calculator.displayValue)*-1;
    else if(num === 'sqr') {
        if(calculator.displayValue !== 0 || null) calculator.displayValue = parseFloat(calculator.displayValue) * parseFloat(calculator.displayValue);
    }
    else if(num === 'sqrt') {
        if(parseFloat(calculator.displayValue) > 0) calculator.displayValue = Math.sqrt(parseFloat(calculator.displayValue));
    }
    else if(num === '=') {
        calculator.secondValue = parseFloat(calculator.displayValue);
        calculator.displayValue = mathAction(calculator.firstValue, calculator.secondValue, currAction);
        calculator.firstValue = parseFloat(calculator.displayValue);
    }
    else if (numbers.includes(num)) {
        if(calculator.displayValue.toString().length < 10) {
            (calculator.displayValue === 0 || calculator.displayValue === null) ? calculator.displayValue = num : calculator.displayValue += num;
        }
    }
    else if(actions.includes(num)) {
        currAction = num;
            calculator.firstValue = parseFloat(calculator.displayValue);
            calculator.displayValue = 0;
            calculator.isSecondValue = true;
    }

    UpdateDisplay();
}

const mathAction = (x,y, action) => {
    let resultOf = 0;
        if(action === '*') {
            return resultOf = x*y;
        }
        else if(action === '/' && y!=0) {
            return resultOf = x/y;
        }
        else if(action === '+') {
            return resultOf = x+y;
        }
        else if(action === '-') {
            return resultOf = x-y;
        }
}

