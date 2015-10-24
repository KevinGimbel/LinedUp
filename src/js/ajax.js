var Ajax = (function(window, document, undefined) {
    
    var Ajax = function() {
        this.URL = null;
        this.output = '';
        this._connections = [];
        this._defaultCallback = function(data) {
          this._response = data;  
        };
        
        return this;
    }
    
    Ajax.prototype.get = function(URL, CALLBACK) {
      if(!CALLBACK) {
        console.warn('Ajax.get should have a callback as second argument. Saving Response in Ajax._response now.');  
        CALLBACK = this._defaultCallback;
      }
      var ajax = new XMLHttpRequest();
        ajax.open('GET', URL);
        
        ajax.onreadystatechange = function() {
          if(ajax.readyState == 4 && ajax.status == 200) {
              CALLBACK(ajax);  
            }
        }

        ajax.send();

      return this;
    }

    Ajax.prototype.post = function(URL, data, CALLBACK) {
      if(!data) {
        console.error('Cannot POST to an endpoint without data. Specify data as second parameter.');  
        return false;
      }

      if(!CALLBACK) {
        console.warn('Ajax.post should have a callback as second argument. Saving Response in Ajax._response now.');  
        CALLBACK = this._defaultCallback;
      }
      var ajax = new XMLHttpRequest();
        ajax.open('POST', URL);
        
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          
        ajax.onreadystatechange = function() {
          if(ajax.readyState == 4 && ajax.status == 200) {
            CALLBACK(ajax.response);  
          }  
        }

        ajax.send(data);
    }

    return new Ajax();
  }(window, document));
