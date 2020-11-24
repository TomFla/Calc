class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement 
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
       this.currentOperand = ''
       this.previousOperand = ''
       this.operation = undefined
    }

    appendNumber(number) {
        if (number === ',' && this.currentOperand.includes(',')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
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

    

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-digits]');
const operationButton = document.querySelectorAll('[data-equation]');
const equalsButton = document.querySelector('[data-equal]');
const clearButton = document.querySelector('[data-delete]');
const percentButton = document.querySelector('[data-percent]')
const previousOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
    
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

percentButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})