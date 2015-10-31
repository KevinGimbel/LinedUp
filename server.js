var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');

var port = config.port || '1337';
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


// ===========================================
//                                ACCESS POINT
// ===========================================
router.get('/', function(req, res) {
  req.sendfile('./public/index.html');
});

// ============================================
//                                   API ROUTES
// ============================================
// Defining routes used from the API

router.use(function(req, res, next) {
  // Needed to make express pass-on URL calls like
  // /api/concerts/ID even though there's a api/concerts/ route
  next();
});

router.route('/concerts')
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

router.route('/concerts/filters')
// Get all concerts when requested with GET
.get(function(req, res) {
    /*
     * Build up filters used to build a
     * dynamic navigation 
     */
    Concert.find({}, 'venue city name -_id',
      null, function(err, data) {
      if(err) {
        res.send(err);  
      }
      
      var filters = {
        venue: [],
        city: [],
        artists: [] 
      };
      data.forEach(function(item) {
        if(filters.venue.indexOf(item.venue) < 0) {
          filters.venue.push(item.venue);  
        }
        if(filters.city.indexOf(item.city) < 0) {
          filters.city.push(item.city);  
        }
        if(filters.artists.indexOf(item.name) < 0) {
          filters.artists.push(item.name);  
        }
      });

      res.json(filters);
      });
});

// Adding the API routes to the `/api` endpoint.
app.use('/api', router);

// ===========================================
//                                    MONGO DB
// ===========================================
mongoose.connect(config.mongodb);

// Starting the server
app.listen(port);
console.log('Server running on port ' + port);



