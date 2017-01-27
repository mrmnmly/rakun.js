// Rkn.js version 0.2.0
// latest commit: 25/01/2017
// author: @lukaszkups
// www: http://lukaszkups.net
// repository: https://github.com/lukaszkups/rakun.js


// Immediately invoked functional expression to wrap plugin code
(function(){
  // Define constructor
  this.Rkn = function(){};     

  Rkn.prototype.state = { 
    // Rkn.state.list property contains all current Rkn instance states
    list: {},

    // Rkn.state.add adds new state to current Rkn instance
    add: function(options){
      // Creating new state object method validation
      if(!options){
        throw new Error('No new state object has been provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the new state is not a valid string.');
      }
      if(this.list[options.name]){
        throw new Error('State with given name already exists.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.');
      }
      // Add new state to Rkn state wrapper
      this.list[options.name] = options.data;  
      // Return pointer to added state as a success response
      return this.list[options.name];
    },

    // Rkn.state.remove removes state based on given state name
    remove: function(stateName){
      // Remove Rkn state object method validation
      if(!stateName){
        throw new Error('State name has not been provided.');
      }
      if(typeof stateName !== 'string'){
        throw new Error('State name is not a valid string.');
      }
      if(!this.list[stateName]){
        throw new Error('State doesn\'t exists.');
      }
      // Remove state with given name from Rkn states wrapper
      delete this.list[stateName];
      // Return true as a success response
      return true;
    },

    // Rkn.state.get returns state based on given state name or, if doesn't exists - false
    get: function(stateName){
      // Get Rkn state object method validation
      if(!stateName){
        throw new Error('State name has not been provided.');
      }
      if(typeof stateName !== 'string'){
        throw new Error('State name is not a valid string.');
      }
      // If desired state doesn't exists, return false, otherwise return it as a success response.
      if(!this.list[stateName]){
        return false;
      }else{
        return this.list[stateName];
      }
    },
    
    // Rkn.state.update updates state based on given state object
    update: function(options){
      // Update Rkn state method validation
      if(!options){
        throw new Error('No update state options has been provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the state is not a valid string.');
      }
      if(!this.list[options.name]){
        throw new Error('State doesn\'t exists.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.');
      }
      // Update state
      this.list[options.name] = options.data;
      // Return pointer to updated state as a success response
      return this.list[options.name];
    },

    // Rkn.state.updateOrCreate updates state if exist or, if it doesn't, it creates it
    updateOrCreate: function(options){
      // Update or create Rkn state method validation
      if(!options){
        throw new Error('No update state options has been provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the state is not a valid string.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.');
      } 
      // Check if state exits - if true then update, else create a new state
      // Although this if-else do at the moment same thing, but in the future it will detach binded to state components from existing state (on update)
      if(!this.list[options.name]){
        this.list[options.name] = options.data;
        // Return pointer to updated state as a success response
        return this.list[options.name];
      }else{ 
        this.list[options.name] = options.data;
        // Return pointer to new state as a success response
        return this.list[options.name];
      }
    }
  }


  // RKN COMPONENT MANAGEMENT


  Rkn.prototype.component = {
    // Rkn.component.list property contains all current Rkn instance component instances
    list: {},

    // Rkn.component.add adds new component to current Rkn instance
    add: function(options){
      // Add Rkn component method validation
      if(!options){
        throw new Error('No options for creating new components were provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the component is not a valid string.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      if(this.list[options.name]){
        throw new Error('Component with given name already exists.');
      }
      // Add new component to current Rkn instance component wrapper
      this.list[options.name] = options;
      // Return created component as a success response
      return this.list[options.name];
    },

    // Rkn.component.remove removes component based on given name from current Rkn instance 
    remove: function(componentName){
      // Remove Rkn component method validation
      if(!componentName || !componentName.length){
        throw new Error('Component name has not been provided.');
      }
      if(typeof componentName !== 'string'){
        throw new Error('Given component name is not a valid string.');
      }
      if(!this.list[componentName]){
        throw new Error('Component doesn\'t exists.');
      }
      // Remove Rkn component
      delete this.list[componentName];
      // Return true as a success reponse
      return true;
    },
    
    // Rkn.component.update updates existing Rkn component based on given component object
    update: function(options){
      // Update Rkn component method validation
      if(!options){
        throw new Error('No options for creating new components were provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the component is not a valid string.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      if(!this.list[options.name]){
        throw new Error('Component with given name doesn\'t exists.');
      }
      // Update existing Rkn component
      this.list[options.name] = options;
      // Return updated component as a success reponse
      return this.list[options.name];
    },
    
    // Rkn.component.updateOrCreate updates component or, if it doesn't exists, creates it
    updateOrCreate: function(options){
      // Update or create  Rkn component method validation
      if(!options){
        throw new Error('No options for creating of updating component were provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the component is not a valid string.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      // Update or create existing Rkn component
      this.list[options.name] = options;
      // Return updated or created component as a success reponse
      return this.list[options.name];
    }
  } 

    // RKN STATE/COMPONENT MANAGEMENT 


    // bind newly created component to data source state
    // TODO
}());

