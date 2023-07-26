const buttons = document.querySelectorAll('.button')
const screen = document.querySelector('.screen')
const eraser = document.querySelector('#eraser')

const calculator = {
    screen: screen,
    operation: '',

    addDigit(digit) {
        if (digit === '.' && this.screen.innerText.includes('.')) {
            return console.log('Alredy have a dot')
        }

        this.screen.innerText += digit
        
        this.operation = this.screen.innerText
    },

    addOperator(operator) {
        const operators = ['+', '-', '*', '/']

        if (operators.includes(operator)) {
            this.screen.innerText += operator
        }

        switch (operator) {
            case '=':
                this.resolveOperation()
                break
            case 'C':
                this.clear()
                break
        }
        
    },

    resolveOperation() {
        this.screen.innerText = eval(this.operation)
    },

    clear() {
        this.screen.innerText = ''
    },

    erase() {
        this.screen.innerText = this.screen.innerText.slice(0, -1)
    }   
}

buttons.forEach((i) => {
    i.addEventListener('click', (e) => {
        let value = e.target.innerText

        if (isNaN(value) === false  || value === '.') {
            calculator.addDigit(value)
        } else {
            calculator.addOperator(value)
        }
    })
})

eraser.addEventListener('click', () => {
    calculator.erase()
})