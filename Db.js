const mysql = require('mysql')
var sql = "";



exports.DbExecucoes = function executar(pEntidade, pChave, pReferencia, pAtributo, pNovoValor,pLocal, pOpcao,valoresAtributos) {


  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dBEntidades"
  });
  //------------grava os dados 


  con.connect(function (err) {

    if (err) throw err;

   

    //------------comando sql 

    console.log("opção é : " + pOpcao);

    if (pOpcao == 1) {
      //--------
      if (pChave != "pk" && pChave != "fk" && pChave != "nNull") {
        sql = "CREATE TABLE " + pEntidade + " (" + pAtributo + " varchar(255));";
        query();
       
      }


      if (pChave == "pk") {
        sql = "CREATE TABLE " + pEntidade + " ( " + pAtributo + " varchar(255) NOT NULL , PRIMARY KEY ( " + pAtributo + ") );"
        query();
      }
      if (pChave == "fk") {
        
        sql = "CREATE TABLE " + pEntidade + " ( " + pAtributo + " varchar(255) NOT NULL , FOREIGN KEY ( " + pAtributo + " ) REFERENCES " + pReferencia + ");"
        console.log(pReferencia);
        query();
      }

      if (pChave == "nNull") {
        sql = "CREATE TABLE " + pEntidade + " (" + pAtributo + " varchar(255) NOT NULL);";
        console.log(sql);
        query();
      }
      console.log(sql);
      console.log(pChave);
      //----------
    }

    if (pOpcao == 2) {
      //-------------
      //criar um novo atributo 
      if (pChave != "pk" && pChave != "fk" && pChave != "nNull") {
        
        sql = " ALTER TABLE " + pEntidade + " ADD " + pAtributo + " varchar(255);"
        console.log(sql);
        query();
        //--
      }

      if (pChave == "pk") {
        sql = " ALTER TABLE " + pEntidade + " ADD " + pAtributo + " varchar(255);"
        query();
        sql = " ALTER TABLE " + pEntidade + " ADD PRIMARY KEY (" + pAtributo + ");"
       
        console.log(sql);
        query();
      }
      if (pChave == "fk") {
        sql = " ALTER TABLE " + pEntidade + " ADD " + pAtributo + " varchar(255);"
        query();
        sql = " ALTER TABLE " + pEntidade + " ADD FOREIGN KEY (" + pAtributo + ") REFERENCES " + pReferencia + ";"
        //ALTER TABLE Clientes ADD FOREIGN KEY (id) REFERENCES Carros(id);
       
        console.log(sql);
        query();
      }
      if (pChave == "nNull") {
        sql = " ALTER TABLE " + pEntidade + " ADD " + pAtributo + " varchar(255) NOT NULL;"
        console.log(sql);
        query();
      }
      //--
      //--------------------
    }
      //-------------deletar tabela
    if (pOpcao == 3) {
      
      sql = "DROP TABLE " + pEntidade + " ;";

      query()
      //--------------------
    }
    //--------------
    if (pOpcao ==4) {
      // função para ler o objeto 
      function lerObjeto(obj) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (element !== "" && element !== " ") {
              sql= "INSERT INTO "+ pEntidade +" (" + pAtributo + ") VALUES ('"+ element +"');"
              console.log(sql);
              query();
            }else {
             
            }
            
            
            
          }
        }
      }
     
      lerObjeto(valoresAtributos);
       // end função para ler o objeto 
      }//end if (pOpcao ==4)
    //--------------
    
    if (pOpcao ==5) {
      sql= "UPDATE "+ pEntidade +" SET " + pAtributo + "='" + pNovoValor + "' WHERE " + pLocal + ";"
      console.log(sql);
      query()
      
    }
    //---------------------------------------
    function query() {
     
      con.query(sql, function (err, result) {

        //if (err) throw err;
        console.log(result);
        console.log(err + " e também " + result);
        //con.end()
      })//.end();

      
    }//ende query()



  
    console.log("Conectado ao banco de dados");



    con.end()


  });
  
  //return ;


}//end registraUsuarios






  //--------------------



  

