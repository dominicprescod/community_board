var mongoose        = require('mongoose'),
    Schema          = mongoose.Schema,
    commentSchema   = require('./comment.js').schema,
    boardSchema     = require('./board.js').schema,
    bcrypt          = require('bcrypt-nodejs');

mongoose.set('debug', true);

var userSchema = new Schema({

      firstName:  {type: String, required: true},
      lastName:   {type: String, required: true},
      email:      {type: String, required: true},
      password:   {type: String, required: true},
      street:     {type: String, required: true},
      city:       {type: String, required: true},
      state:      {type: String, required: true},
      zip:        {type: Number, required: true},
      pic:        String,
      boards: [boardSchema]

},{collection: 'users'});

// generating a hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;
