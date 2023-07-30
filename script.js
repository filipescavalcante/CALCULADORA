const buttons = document.querySelectorAll('.button')
const screen = document.querySelector('.screen')
const eraser = document.querySelector('#eraser')

const calculator = {
    screen: screen,
    previous: '',
    current: '',
    operation: '',
    
    addDigit(digit) {
        if (digit === '.' && this.current.includes('.')) {
            return
        }

        this.current += digit

        if (this.previous === '') {
            this.screen.innerText = this.current
        } else {
            this.operation = this.previous + this.current 

            this.screen.innerText = this.operation
        }   
    },

    addOperator(operator) {
        const operators = ['+', '-', '*', '/']

        const validation = () => {
            const lastChar = this.previous.slice(-1)

            // return (operators.includes(lastChar) ? false : true)

            if (operators.includes(lastChar) === true) {
                return false
            } else {
                return true
            }
        }
        
        if (validation() === true) {
            if (operators.includes(operator)) {
                this.current += operator
                this.previous += this.current
                this.current = ''
    
                this.screen.innerText = this.previous

                console.log(this.previous.slice(-1))
            }   
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
        this.previous = ''
        this.current = eval(this.operation)
        this.screen.innerText = this.current
    },

    clear() {
        this.screen.innerText = ''
        this.previous = ''
        this.current = ''
        this.operation = ''
    },

    erase() {
        if (this.current === '') {
            this.previous = this.previous.slice(0, -1)
            this.screen.innerText = this.previous
        } else {
            this.current = this.current.slice(0, -1)
            this.screen.innerText = this.current
        }
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