const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        // дописать валидацию!
    },
    favorite: {
      type: Boolean,
      default: false,
    },
})

// компилируем  схему в модель
const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = {Contacts};
