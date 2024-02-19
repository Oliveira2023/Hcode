const main = (params) => {
    let primeNumbers = []
for (let j = 2; j<=params;j++){
    if(selecaoPrimos(j)){
        primeNumbers.push(j)
    }
}
function selecaoPrimos(numero){
    for (let i = 2; i<numero; i++){
        
        if (numero % i == 0) {
            return false
        }
    }
    return true
}
let somaPrime = primeNumbers.reduce(function(soma, valor){
    return soma+valor
},0)
return somaPrime
}
main(1000)