	
var models = require('../models/models.js');

//Autoload
exports.load = function (req, res, next, quizId){
  console.log('quizId:'+quizId);
  models.Quiz.find(
    quizId).then(
      function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else { 
          next(new Error ('No existe quizId='+ quizId));
        };
      }
    ).catch(
      function(error) { next(error)}
    )
  
};




// GET /quizes
exports.index = function (req, res) {
  //Comprobo si teño o parámetro search
  if (req.query.search!=undefined) {
    //Reemplazo espacios por % para a busqueda
    cadena=req.query.search.replace(' ', '%');
    models.Quiz.findAll({where: ["pregunta like ?","%"+cadena+'%']}).then(
      function(quizes){
        res.render('quizes/index',{quizes: quizes});
      }
    ).catch(function(error) {next (error);})
  } else {
    models.Quiz.findAll().then(
      function(quizes){
        res.render('quizes/index',{quizes: quizes});
      }
    ).catch(function(error) {next (error);})
  }
};

// GET /quizes/:id

exports.show = function (req, res) {
    res.render('quizes/show', {quiz: req.quiz});
    
};


// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado='Incorrecto';
    if(req.query.respuesta===req.quiz.respuesta){
        resultado = 'Correcto'; 
      } 
      res.render('quizes/answer',
          {quiz:req.quiz, respuesta:resultado});
};









