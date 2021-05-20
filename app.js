
class Calculator {
    constructor(prevOperandTextEl, currentOperandTextEl) {
        this.prevOperandTextEl =  prevOperandTextEl;
        this.currentOperandTextEl = currentOperandTextEl;
        this.clear();

    }


    clear() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
         this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number == '.' && this.currentOperand.includes('.')) return

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return

        if(this.prevOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }
 
    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand),
            current = parseFloat(this.currentOperand);
        

        if( isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '/':
                computation = prev / current
                break

            default:
                return
            
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = '' 
    
    }


    getDisplayNumber (number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        }else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }    

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

        // // parseFloat 문자열을 실수로 바꿈 parseFloat( string )
        // if(isNaN(floatNum)) return '';
        // return number.toLocaleString('en');
        // // 사용자의 문화권에 맞는 시간표기법으로 년,월,일 시간을 리턴
        // // * toLocaleString 은 Number 타입의 내장 함수이며, 
        // // 인자로 들어온 지역 값에 따른 숫자 표기 방식을 적용하여, 문자열로 반환하는 역할을 합니다. 'en'은 영어권 국가의 숫가 표기 방식을 사용하겠다는 것을 지정한 것입니다. 미국이나 영어권 국가에서는 숫자를 표기할 때, 3자리마다 숫자를 끊어 콤마를 삽입하여 사용합니다.
        //   decimal - 소수 integer - 정수 digits - 숫자
    }

    updateDisplay() {
        this.currentOperandTextEl.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.prevOperandTextEl.innerText = 
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandTextEl.innerText = '';
        }   
    }
}
 
 

const numberBtn = document.querySelectorAll('[data-number]'),
operationBtn = document.querySelectorAll('[data-oparation]'),
equalsBtn = document.querySelector('[data-equals]'),
deleteBtn = document.querySelector('[data-delete]'),
acBtn = document.querySelector('[data-all-clear]'),
prevOperandTextEl = document.querySelector('[data-prev-operand]'),
currentOperandTextEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextEl, currentOperandTextEl);

numberBtn.forEach( btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
        
    })
});
// 버튼의 각각에 클릭이벤트가 발생하면 계산기클래스의 appenNumber에 
// 버튼의이너텍스트를 보냄 그다음 업데이트 디스플레이를 실행


operationBtn.forEach( btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
        
    })
});

equalsBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
});

acBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
});



// operation -조작