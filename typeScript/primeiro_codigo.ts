console.log("Hello World! Este é meu primeiro código em TypeScript");

console.log("=======================================================================");

const nome =  "João"
console.log(`Ola ${nome}! Seja bem vindo!`);

console.log("=======================================================================");

class Produto {
    nome: string
    preco: number
    constructor(nome: string, preco: number) {
        this.nome = nome
        this.preco = preco
    }
}
const playstation5 = new Produto("Playstation 5", 5000)
