class CalcController {
    constructor(){
        this._audio = new Audio('click.mp3')
        this._audioOnOff = true
        this._lastOperator = ''
        this._lastNumber = ''

        this._operation = []
        this._locale = 'pt-br'
        this._displayCalcEl = document.querySelector("#display")
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this.currentDate;
        this.intitialize();
        this.initButtonsEvents();
        this.initKeyBoard()
    }
    
    copyToClipBoard(){
        let input = document.createElement('input')
        input.value = this.displayCalc
        document.body.appendChild(input)
        input.select()
        navigator.clipboard.writeText(input.value)
        //document.execCommand('Copy') não utilizar- descontinuado(deprecated)
        input.remove()
    }
    pasteFromClipBoard(){
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text')
            this.push_Operation(parseFloat(text))
            this.displayCalc = parseFloat(text)
            
        })
    }

    intitialize(){

        this.setDisplayDateTime()
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000);
        
        this.setLastNumberToDisplay()
        this.pasteFromClipBoard()

        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick', e=>{
                this.toggleAudio()
            })
        })
    }

    toggleAudio(){
        this._audioOnOff = !this._audioOnOff
    }

    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0
            this._audio.play()
        }
    }
    initKeyBoard(){
        document.addEventListener("keyup", e=>{
            this.playAudio()
            switch(e.key){
                case "Escape":
                    this.clearAll()
                    break
                case "Backspace":
                    this.clearEntry()
                    break
                case "+":
                case "-":
                case "/":
                case "*":
                case "%":
                    this.add_Operation(e.key)
                    break
                case "=":
                case "Enter":
                    this.calc()
                    break
                case '.':
                case ',':
                    this.addDot()
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.add_Operation(parseInt(e.key))
                    break
                case 'c':
                    if(e.ctrlKey) this.copyToClipBoard()
                    break

            }
        })
    }
    addEventListenerAll(element, events, fn){
 
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        })

    }
    clearAll(){
        this._operation = []
        this._lastNumber = ''
        this._lastOperator = ''
        this.setLastNumberToDisplay()
    }
    clearEntry(){
        this._operation.pop()
        this.setLastNumberToDisplay()
    }
    setError(){
        this.displayCalc = "Error"
    }
    getLast_Operation(){
        return (this._operation[this._operation.length-1])
        
    }
    setLast_Operation(value){
        
        this._operation[this._operation.length -1] = value
    }
    isOperator(value){
        return (['+','-', '*', '/','%'].indexOf(value) > -1)
    }
    push_Operation(value){
        this._operation.push(value)
        if (this._operation.length > 3){
            this.calc()
        }
    }

    getResult(){
        try{
            return eval(this._operation.join(""));
        }catch(e){
            setTimeout(()=>{
                this.setError()
            }, 1)
        }
        
        
    }

    calc(){
        let last = ''
        this._lastOperator = this.getLastItem(true)
        if (this._operation.length < 3){
            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastOperator, this._lastNumber]
        }
        if (this._operation.length > 3){
            last = this._operation.pop()
            // this._operation vai estar com 2+3 Porque tira o ultimo +
            this._lastNumber = this.getResult()
        }else if (this._operation.length == 3){
            
            this._lastNumber = this.getLastItem(false)
        }

        let result = this.getResult()
        
        if (last == '%'){
            
            result /= 100
            
            this._operation = [result]
            
        }else{
            this._operation = [result]
            if (last) this._operation.push(last)
        }
        this.setLastNumberToDisplay()
    }

    getLastItem(isOperator = true){

        let lastItem;
        
        for(let i = this._operation.length-1; i>=0;i--){

            if (this.isOperator(this._operation[i]) == isOperator){

                lastItem = this._operation[i]
                break
            }
            
        }
        
        if (!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber

        }

        return lastItem
        
    }
    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false)

        if(!lastNumber) lastNumber = 0
        this.displayCalc = lastNumber

    }
    add_Operation(value){
        
        if (isNaN(this.getLast_Operation())){

            if(this.isOperator(value)){
                
                this.setLast_Operation(value);
                
            }else{//é um numero=>entra aqui a 1 digitação de numero, porque antes o array está vazio e a ultima operaçao é undefined(então NAN-true e não é um operador)
                
                this.push_Operation(value)//faz um push desse valor

                this.setLastNumberToDisplay()
            }
        }else{
            
            if (this.isOperator(value)){

                this.push_Operation(value)
            }else{//1 vez vem aqui
                let newValue = this.getLast_Operation().toString() + value.toString();
                this.setLast_Operation(newValue)
                
                this.setLastNumberToDisplay()
            }
            
        }
    }
    addDot(){
        let lastOperation = this.getLast_Operation()
        console.log(typeof(lastOperation))
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return
        if (this.isOperator(lastOperation) || !lastOperation){
            this.push_Operation('0.')
        }else {
            this.setLast_Operation(lastOperation.toString() + ".")
        }
        this.setLastNumberToDisplay()
        
    }
    execBtn(value){
        this.playAudio()
        switch(value){
            case "ac":
                this.clearAll()
                break
            case "ce":
                this.clearEntry()
                break
            case "soma":
                this.add_Operation('+')
                break
            case "subtracao":
                this.add_Operation('-')
                break
            case "divisao":
                this.add_Operation('/')
                break
            case "multiplicacao":
                this.add_Operation('*')
                break
            case "porcento":
                this.add_Operation('%')
                break
            case "igual":
                this.calc()
                break
            case 'ponto':
                this.addDot()
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.add_Operation(parseInt(value))
                break
            default:
                this.setError
                break
        }
    }
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons >g,#parts > g")
        //selecionamos todos os botôes para aplicar os eventos nos botões
        buttons.forEach((btn, index)=>{//para cada botão faz o seguinte...
            this.addEventListenerAll(btn, 'click drag', e=>{//cria o metodo addEventListenerAll porque o addEventListener só suporta 1 evento. e o metodo acima trata esta condição.
                let texBtn = btn.className.baseVal.replace("btn-","")
                this.execBtn(texBtn)
            })
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=> {//mesma situação do click, neste caso para mudar o cursor quando passa o mouse em cima do botão.
                btn.style.cursor = "pointer"
            })
        })
 
    }
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }
    get displayTime(){
        return this._timeEl.innerHTML
    }
    set displayTime(value){
        return this._timeEl.innerHTML = value
    }
    get displayDate(){
        return this._dateEl.innerHTML
    }
    set displayDate(value){

        return this._dateEl.innerHTML = value
    }

    get displayCalc(){

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        if(value.toString().length>10){
            this.setError()
            return false
        }
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(value){
        this.currentDate = value
    }
}