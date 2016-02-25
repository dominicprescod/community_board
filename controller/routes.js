var express       = require('express'),
    passport      = require('passport'),
    router        = express.Router(),
    User          = require('../models/user.js'),
    Comment       = require('../models/comment.js'),
    Board         = require('../models/board.js');

// homepage
// =====================================
router.get('/', function(req, res){
  res.render('index.ejs');
});
// =====================================


// Login & Logout
// ===========================================================
// login
router.post('/login',passport.authenticate('local-login',{
    failureRedirect: '/',}), function(req,res){
        res.redirect('/users/'+req.user.id);
  });

// logging out from current session
router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/');
});
// ===========================================================

// Adding new user! / Registering a new user
// =================================================================================================================================================================================
router.post('/',passport.authenticate('local-signup',{
  failureRedirect: '/'}),function(req,res){
    // creating new boards according to the new user's info
    // grabbing the zip code, city and state from the user registration form and putting them in an array to loop through the options
    var boardChecks = [req.user.zip, req.user.city, req.user.state];
    // looping through each entry
    boardChecks.forEach(function(i){
      // checks if the zip city or state already exists
      Board.findOne({'name': i},function(err,board){
        if(!board){//if it does not exist do the following board = null
          var newBoard = new Board({name: i}); //create a new board object with the name set as the zip/city/state
          newBoard.members.push(req.user.id)
          // saving the boards to the user schema for reference
          User.findById(req.user.id,function(err, user){
              user.boards.push(newBoard);
              user.save(function(){});
          });
          newBoard.save(function(){}); //save the newly created board
        } else {
          board.members.push(req.user.id);
          board.save(function(){});
          User.findById(req.user.id,function(err, user){
              user.boards.push(board);
              user.save(function(){});
          });
        }//end of else
      });
    });
    res.redirect('/users/'+req.user.id); //redirect to the user profile page
});
// =================================================================================================================================================================================


// SHOW USER page
// ======================================================================================================================
router.get('/users/:id', isLoggedIn, function(req, res) {
  // for user control flow within template (enables editing only on the user's own page)
    req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;
  // finding users by the id passed in the webpage
  console.log(res.locals.usertrue)
  User.findById(req.params.id,function(err, user){
    // if the page viewed is not the person logged in find or create an inbox message board
    if(!res.locals.usertrue){
      // finds the board that has a name of both the users combined
        Board.findOne({$or:[{name: req.user.id+'-'+req.params.id},{name: req.params.id+'-'+req.user.id}]}, function(err, board){
          if(board){//if the inbox message between two users exist it renders the page with the inbox information
            res.render('profile.ejs',{
              data:user,
              inbox:board,
              loggedIn: req.user
            });
          } else { //if the inbox messages does not exist it creates a new inbox message board between the users and renders the page
            var newInboxMessage = new Board({name:req.user.id+'-'+req.params.id});
            newInboxMessage.fpal.push({
              firstName: user.firstName,
              lastName: user.lastName,
              rId: user.id,
              pic: user.pic
            });
            newInboxMessage.spal.push({
              firstName:req.user.firstName,
              lastName: req.user.lastName,
              rId: req.user.id,
              pic: req.user.pic
            });
            newInboxMessage.save(function(err, board){
              res.render('profile.ejs', {
                data:user,
                inbox: board,
                loggedIn: req.user
              });
            });
          }
        });
    } else {
      // when the current user is viewing their profile page, render their inbox with all the between them and another user
      // the inbox message is simply a board thats named with a combination of both user's ids with a - between them
      // this query checks all boards for the current user's in as part of the name string
      Board.find({name: {"$regex": req.params.id, "$options": "i"}},function(err,docs){
        // console.log(docs);
        // rendering with that specific user's data
        res.render('profile.ejs',{
          data: user,
          inbox: docs,
          loggedIn: req.user

        });
      });

    }
      });
});
// ======================================================================================================================

// edit User page with Pic
// ======================================================================
router.put('/:id/editPic', function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body,function(err, data){
      res.redirect('/users/'+data.id);
    });
});
// ======================================================================


// SHOW board page
// ====================================================
router.get('/board/:id',function(req,res){
  Board.findById(req.params.id,function(err,info){
    // console.log(info.name.replace(/[req.user.id-]/g,""));
    if(info.members.length === 0) res.redirect('/users/'+info.name.replace(req.user.id,"").replace('-',''));
    res.render('board.ejs',{
      data:info,
      user: req.user
    });
  });
})
// ====================================================

// New Comment
// ====================================================
router.post('/comment',function(req,res){
  // creates a new comment using the schema
    var newComment = new Comment(req.body);
    // finds the current board using the information captured the form
    Board.findById(newComment.parent,function(err,board){
      // pushing to the comments element in the object and saving
      board.comments.push(newComment);
      board.save(function(){});
      res.redirect('/board/'+newComment.parent);
    });
});
// ====================================================





function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
    module.exports = router;
