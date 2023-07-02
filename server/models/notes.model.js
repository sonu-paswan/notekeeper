const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubSchema= new Schema({
    title:{type:String},
    content:{type:String}
})

const userSchema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    notes:{type:[SubSchema]}
})

// userSchema.pre("save", async function (next) {
//     console.log(this.password);
//     console.log(typeof this.password)
//     const salt = 10
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.statics.login = async function (email, password) {
    
    const user = await this.findOne({ email });
    
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const notes = mongoose.model('user',userSchema);

module.exports = notes;