// Rkn.js version 0.2.0
// latest commit: 25/01/2017
// author: @lukaszkups
// www: http://lukaszkups.net
// repository: https://github.com/lukaszkups/rakun.js


// Immediately invoked functional expression to wrap plugin code
(function(){
  // Define constructor
  this.Rkn = function(){
    // Define pointer to Rkn object
    var _self = this;
     
    // Define Rkn state property
    _self.state = {};

    // Define Rkn state wrapper, which will contain all current Rkn instance states
    _self.state.states = {};
    
    // Define local pointer to Rkn state wrapper
    var _states = _self.state.states;
    
    // Define Rkn component property
    _self.component = {};
    
    // Define Rkn component wrapper, which will contain all Rkn component instances
    _self.component.components = {};

    // Define local pointer to Rkn component wrapper
    var _components = _self.component.components;
    
    // Define Rkn state/component binding object
    _self.stateComponent = {};
    
    // Define Rkn stateComponent wrapper, which will contain all state/component bindings
    _self.stateComponent.stateComponents = {};

    // Define local pointer to state/component binding object
    _stateComponents = _self.stateComponent.stateComponents;


    // RKN STATE MANAGEMENT


    // Define Rkn state list method, which returns all current Rkn instance states
    _self.state.prototype.list = function(){
      return _states; 
    }

    // Define Rkn state add method
    _self.state.prototype.add = function(options){
      // Creating new state object method validation
      if(!options){
        throw new Error('No new state object has been provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the new state is not a valid string.');
      }
      if(_states[options.name]){
        throw new Error('State with given name already exists.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.');
      }
      // Add new state to Rkn state wrapper
      _states[options.name] = options.data;  
      // Return pointer to added state as a success response
      return _states[options.name];
    }

    // Define Rkn state remove method
    _self.state.prototype.remove = function(stateName){
      // Remove Rkn state object method validation
      if(!stateName){
        throw new Error('State name has not been provided.');
      }
      if(typeof stateName !== 'string'){
        throw new Error('State name is not a valid string.');
      }
      if(!_states[stateName]){
        throw new Error('State doesn\'t exists.');
      }
      // Remove state with given name from Rkn states wrapper
      delete _states[stateName];
      // Return true as a success response
      return true;
    }

    // Define Rkn state get method
    _self.state.prototype.get = function(stateName){
      // Get Rkn state object method validation
      if(!stateName){
        throw new Error('State name has not been provided.');
      }
      if(typeof stateName !== 'string'){
        throw new Error('State name is not a valid string.');
      }
      // If desired state doesn't exists, return false, otherwise return it as a success response.
      if(!_states[stateName]){
        return false;
      }else{
        return _states[stateName];
      }
    }
    
    // Define Rkn state update method
    _self.state.prototype.update = function(options){
      // Update Rkn state method validation
      if(!options){
        throw new Error('No update state options has been provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the state is not a valid string.');
      }
      if(!_states[options.name]){
        throw new Error('State doesn\'t exists.');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.');
      }
      // Update state
      _states[options.name] = options.data;
      // Return pointer to updated state as a success response
      return _states[options.name];
    }

    // Define Rkn state update or create method
    _self.state.prototype.updateOrCreate = function(options){
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
      if(!_states[options.name]){
        _states[options.name] = options.data;
        // Return pointer to updated state as a success response
        return _states[options.name];
      }else{ 
        _states[options.name] = options.data;
        // Return pointer to new state as a success response
        return _states[options.name];
      }
    }
    

    // RKN COMPONENT MANAGEMENT


    // Define Rkn component list method, which returns all current Rkn instance components
    _self.component.prototype.list = function(){
      return _components; 
    }

    // Define Rkn add component method
    _self.component.prototype.add = function(options){
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
      if(_components[options.name]){
        throw new Error('Component with given name already exists.');
      }
      // Add new component to current Rkn instance component wrapper
      _components[options.name] = options;
      // Return created component as a success response
      return _components[options.name];
    }

    // Define Rkn component remove method 
    _self.component.prototype.remove = function(componentName){
      // Remove Rkn component method validation
      if(!componentName || !componentName.length){
        throw new Error('Component name has not been provided.');
      }
      if(typeof componentName !== 'string'){
        throw new Error('Given component name is not a valid string.');
      }
      if(!_components[componentName]){
        throw new Error('Component doesn\'t exists.');
      }
      // Remove Rkn component
      delete _components[componentName];
      // Return true as a success reponse
      return true;
    }
    
    // Define Rkn component update
    _self.component.prototype.update = function(options){
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
      if(!_components[options.name]){
        throw new Error('Component with given name doesn\'t exists.');
      }
      // Update existing Rkn component
      _components[options.name] = options;
      // Return updated component as a success reponse
      return _components[options.name];
    }
    
    // Define Rkn component update or create method
    _self.component.prototype.updateOrCreate = function(options){
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
      _components[options.name] = options;
      // Return updated or created component as a success reponse
      return _components[options.name];
    }
    

    // RKN STATE/COMPONENT MANAGEMENT 


    //   

  }
}());

