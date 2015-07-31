var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload con :quizId
router.param('quizId', quizController.load);

//Rutas de /quizes
router.get('/quizes',                       quizController.index);
//Rura para a lista
router.get ('/quizes/:quizId(\\d+)',        quizController.show);
router.get ('/quizes/:quizId(\\d+)/answer', quizController.answer);


//router.get('/quizes/question', quizController.question);
//router.get ('/quizes/answer', quizController.answer);
//Ruta para os creditos
router.get ('/author', function(req,res){
  res.render('author', { title:'Quiz'});
});



module.exports = router;
