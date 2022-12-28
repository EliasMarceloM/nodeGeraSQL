const port = process.env.PORT
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//-- para usar body-parser
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//-- para usar body-parser
// para acesssar o banco de dados
var Db = require('./Db');


app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html')
})

app.post('/gerador', (req, res) => {
  console.log("----");
  console.log("tipo de chave " + req.body.chave);
  console.log("tipo de opção " + req.body.escolhaAcao);
  console.log("tipo de Referencia " + req.body.referencia);
  console.log("----");
  var opcao = 0;
  try {
    //processa o tipo de gravação 
    //processa o tipo de gravação 

    if (req.body.Entidade != "" && req.body.escolhaAcao == "Criar uma Entidade" && req.body.Atributo != "") {
      console.log("o valor da entidade é " + req.body.Entidade);
      opcao += 1;
    }
    if (req.body.Entidade != "" && req.body.escolhaAcao == "adiciona dado a uma entidade" && req.body.Atributo != "") {
      console.log("o valor da entidade é " + req.body.Entidade);
      opcao += 2;
    }
    if (req.body.Entidade != "" && req.body.escolhaAcao == "Deleta uma Entidade") {
      console.log("o valor da entidade é " + req.body.Entidade);
      opcao += 3;
    }
    if (req.body.Entidade != "" && req.body.escolhaAcao == "adValorAtributo") {
      console.log("o valor da entidade é " + req.body.Entidade);
      opcao += 4;
    }
    if (req.body.Entidade != "" && req.body.escolhaAcao == "modifValorAtributo") {
      console.log("o valor da entidade é " + req.body.Entidade);
      opcao += 5;
    }
    console.log("------>" + req.body.escolhaAcao)
    console.log("------>" + req.body.novoValor)
    console.log("------>" + req.body.local)
    console.log("------>" + opcao)

    console.log("adValorAtributo" + req.body.escolhaAcao)
    //função para pegar os valores dos atributos 
    console.log(req.body.valorUm)
    function tranformaObjeto() {
      let var1 = req.body.valorUm;
      let var2 = req.body.valorDois;
      let var3 = req.body.valorTres;
      let var4 = req.body.valorQuatro;
      let var5 = req.body.valorCinco;
      let var6 = req.body.valorSeis;
      let var7 = req.body.valorSete;
      let var8 = req.body.valorOito;
      const result = Object.assign({}, { var1, var2, var3, var4, var5, var6, var7, var8 });
      return result;

    }
    var valoresAtributos = tranformaObjeto()
    //end função para pegar os valores dos atributos 

    

    const dbConecao = Db.DbExecucoes(req.body.Entidade, req.body.chave, req.body.referencia, req.body.Atributo,req.body.novoValor,req.body.local, opcao, valoresAtributos);



    return res.send("verifique o banco de dados")

  }//endtry 
  catch (err) {
    console.log(err.message)

  }

})////end app.post('/gerador', (req, res) =>



app.listen(port || 3000, () => {
  return console.log(`servidor rodando`)
})