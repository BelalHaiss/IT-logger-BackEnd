const mongoose = require('mongoose');
const logsSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  message: { type: String, required: true },
  attention: { type: Boolean, default: false },
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tech',
    required: true
  }
});

module.exports = mongoose.model('Log', logsSchema);
