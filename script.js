const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-all-clear]');
const previousOperands = document.querySelector('[data-previous-operand]');
const currentOperands = document.querySelector('[data-current-operand]');
const [...btnToggle] = document.querySelectorAll('.btn');
const body = document.querySelector('.body');

// To switch themes
btnToggle.forEach((toggle, index) => toggle.addEventListener('click', () => body.className = `theme__${index + 1}`))


class Calculator {
    constructor(previousOperands, currentOperands) {
        this.previousOperands = previousOperands;
        this.currentOperands = currentOperands;
        this.clear();
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    addNumber(number) {
        if(this.currentOperand.length > 12) return
        if (number === '.' && this.currentOperand.includes('.')) return // To prevent typing multiple dots(.) 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    pickOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }
    calculate() {
            let computation;
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    computation = prev + current
                    break
                case '-':
                    computation = prev - current
                    break
                case 'x':
                    computation = prev * current
                    break
                case '/':
                    computation = prev / current
                    break
                default:
                    return
            }
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
    }
    getDisplayNumber(number) {
        return new Intl.NumberFormat('en-US').format(number);
    }
    updateDisplay() {
        this.currentOperands.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperands.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperands.innerText = '';
        }
    }
}


const calculator = new Calculator(previousOperands, currentOperands);
numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.addNumber(btn.innerText);
        calculator.updateDisplay();
    })
});
operationBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.pickOperation(btn.innerText);
        calculator.updateDisplay();
    })
});
equalBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});
clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();

})
deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
document.addEventListener('keydown', function (e) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-x\/]/g
    if (e.key.match(patternForNumbers)) {
      e.preventDefault();
      calculator.addNumber(e.key)
      calculator.updateDisplay()
    }
    if (e.key === '.') {
      e.preventDefault();
      calculator.addNumber(e.key)
      calculator.updateDisplay()
    }
    if (e.key.match(patternForOperators)) {
      e.preventDefault();
      calculator.pickOperation(e.key)
      calculator.updateDisplay()
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculator.calculate()
      calculator.updateDisplay()
    }
    if (e.key === "Backspace") {
      e.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (e.key == 'Delete') {
      e.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });