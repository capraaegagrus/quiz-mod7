
var path = require('path');

//Cargar modelo ORM

var Sequelize = require ('sequelize');

//Usar BBDD SQLite

var sequelize = new Sequelize (null,null,null,
                    { dialect: "sqlite",            
		      storage: "quiz.sqlite"
                    });

//Importar a definición da táboa Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Exportamos a definción da táboa Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa a táboa de preguntas na DB
sequelize.sync().success(function(){
  //success(..) Executa o manexador cada vez creada a táboa
  Quiz.count().success(function (count){
    if (count===0){ //A táboa se inicializa só si está valeira
      Quiz.create({pregunta:'Capital de Italia',
		   respuesta: 'Roma'})
      .success (function() { console.log ('Base de datos inicializada')});
    };
  });
});


