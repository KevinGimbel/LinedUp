/**
 * LinedUp JS
 * Stores the data from the API and manipulates it.
 */
var LinedUp = (function(window, document, undefined) {
    var LinedUp = function() {
    this.data = undefined;
    return this;  
    };

    /**
     * get the data
     *
     * @param {Array}  - data
     * @return this
     */
    LinedUp.prototype.setData = function(data) {
    this.data = data;
    return this;  
    }
    
    /**
     * get the data
     * examples
     * LinedUp.getData() => return everything
     * LinedUp.getData(5) => returns first 5 entries
     * LinedUp.gertData(5,25) => returns elements 5 to 25
     *
     * @param {Integer} - amount of data to return
     * @return {Array} - Data
     */
    LinedUp.prototype.getData = function() {
    if(arguments.length == 0) {
    return this.data;  
    }

    if(arguments.length == 1 && (arguments[0] - 0) == arguments[0]) {
    console.log(arguments);
    console.log(arguments.length);
    return this.data.slice(0, arguments[0]);
    }

    if(arguments.length == 2) {
      console.log(arguments);  
      console.log(arguments.length);
      return this.data.slice(arguments[0], arguments[1]);
    }
    }
    
    /**
     * Internal sort-by function.  
     * 
     * @param {String}   - Property to get
     * @param {boolean}  - Sort ascending or descending 
     */
    LinedUp.prototype._sortBy = function(prop, asc) {
      var asc = asc || true;
      return function(a, b) {
        var comp = ((a[prop]+"").toLowerCase() >
            (b[prop]+"").toLowerCase()) ? 1 : -1 ;
        return asc ? comp : -comp;
      }
    }
    
    /**
     * External Sort By. 
     * 
     * @param {String}   - Property to get
     * @param {boolean}  - Sort ascending or descending 
     */
    LinedUp.prototype.sortBy = function(prop, asc) {
      return this.data.sort(this._sortBy(prop, asc));  
    }
    
    /**
     * Reduce Dataset based on given "input". 
     *
     * @param {String}    - Property
     * @param {String}    - Value (value to match)
     */
    LinedUp.prototype.reduceBy = function(prop, value) {
      var data = this.data;
      var dumpArray = [];
      if(!prop && !value) {
        return;  
      }

      for(var i = 0; i<= data.length -1; i++) {
        var item = data[i];
        val = value.toLowerCase().trim();
        key = item[prop].toLowerCase().trim();
        if( key == val ) {
          dumpArray.push(item);
        } 
      }
      return dumpArray;
    }

    return new LinedUp();
}(window, document));


