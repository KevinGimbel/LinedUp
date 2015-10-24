var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');

var port = process.env.PORT || config.port;
var router = express.Router();

// ===========================================
//                                      MODELS
// ===========================================
// Concert Model
var Concert = require('./models/concert');

// ===========================================
//                              EXPRESS CONFIG
// ===========================================
// configuring express
// Using bodyParser inside Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Static Asset directory
app.use(express.static('public'));


// ==========================================
//                               ACCESS POINT
// ==========================================
router.get('/', function(req, res) {
  req.sendfile('./public/index.html');
});

// ===========================================
//                                  API ROUTES
// ===========================================
// Defining routes used from the API

router.use(function(req, res, next) {
  // Needed to make express pass-on URL calls like
  // /api/concerts/ID even though there's a api/concerts/ route
  next();
});

router.route('/concerts')
  // Handle creation of new  
  // Concerts
  .post(function(req, res) {
    var concert = new Concert();
    concert.name    = req.body.name;
    concert.venue   = req.body.venue;
    concert.date    = req.body.date;
    concert.country = req.body.country;
    concert.city    = req.body.city;

    concert.save(function(err) {
      if(err) { res.send(err); }
      
      res.json({ message: 'Concert created!' });
    });
  })
  // Get all concerts when requested with GET
  .get(function(req, res) {
    /*
     * Get all concerts. 
     * First param is the Query, 
     * second is the columns, here we exclude the default _id since we don't need it.
     * 3rd parameter is the sorting:
     * 
     * Sorted by Date
     *        '- then asceding by venue
     *          '- then asceding by name
     */
    Concert.find({}, 'name date venue city country -_id',
    { 
      sort: {
        date: -1,
        venue: 'asc',
        name: 'asc'
      }
    }, function(err, concerts) {
      if(err) {
        res.send(err);  
      }
      res.json(concerts);
    });
});

router.route('/concerts/:concert_id')
  // GET ACTION of api/concerts/:concert_id
  .get(function(req, res) {
    Concert.findById(req.params.concert_id, function(err, concert) {
      if(err) {
        res.send(err);  
      }
      res.json(concert);
    });  
  });
// Adding the API routes to the `/api` endpoint.
app.use('/api', router);

// ===========================================
//                                    MONGO DB
// ===========================================
mongoose.connect('mongodb://localhost/concerts');

// Starting the server
app.listen(port);
console.log('Server running on port ' + port);



