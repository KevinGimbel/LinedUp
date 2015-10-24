var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ConcertSchema = new Schema({
  name: String,
  venue: String,
  city: String,
  country: String,
  date: String
});

module.exports = mongoose.model('Concert', ConcertSchema);
