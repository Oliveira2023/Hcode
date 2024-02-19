class Celular {

    constructor(){
        this.cor = 'Prata'
    }
    ligar(){
        console.log('Uma Ligaçao')
        return "Ligando"
    }

}

let objeto = new Celular()
console.log(objeto.ligar())