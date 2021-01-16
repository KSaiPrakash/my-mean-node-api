const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   },
   lastname: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
   }
});

const Registration = mongoose.model('profile', RegistrationSchema);

module.exports = { Registration };