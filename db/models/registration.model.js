const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
   firstname: { type: String, minlength: 1, index: true,  trim: true },
   lastname: { type: String, minlength: 1, index: true,  trim: true }
});

const Registration = mongoose.model('profile', RegistrationSchema);

module.exports = { Registration };