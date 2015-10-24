  var RenderEngine = function() {
    this.data = [];  
    return this;
  }

  RenderEngine.prototype.setData = function(data) {
    this.data = data;  
    return this;
  }

  RenderEngine.prototype.setTemplate = function(template) {
    this.template = template;  
    return this;
  }
  
  RenderEngine.prototype.render = function() {
  var data = this.data;
  var template = this.template;
  var outputStr = ''; 
    
    for(var i = 0; i < data.length; i++) {
      // asigning the var obj to the current dataset
      var obj = data[i];
      // replacing the template stuff e.g. {title} 
      var output = template.replace(/\{(.*?)\}/g, function(match, property) {
        // returning the matching property
        return obj[property];
      });
      
      // inserting every output into the output area
      outputStr += output;
    }
    return outputStr;
}
