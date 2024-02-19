let carros = ['palio 98', 'toro', 'uno', 10, true, new Date(), function(){}];

carros.forEach(function(dado, indice){
    //console.log(indice, dado)
})

let celular = function(){

    this.cor = "prata"
    this.ligar = function(){
        console.log("uma ligação")
        return "Ligando"
    }

}

let objeto = new celular()
console.log(objeto.ligar())