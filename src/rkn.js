// Rkn.js version 0.2.0
// latest commit: 12/02/2017
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
        throw new Error('Name of the new state is not a valid string. [ ' + options.name + ']');
      }
      if(this.list[options.name]){
        throw new Error('State with given name already exists. [' + options.name + ']');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value. [' + options.data + ']');
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
        throw new Error('State name is not a valid string. [' + stateName + ']');
      }
      if(!this.list[stateName]){
        throw new Error('State doesn\'t exists. [' + stateName + ']');
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
        throw new Error('State name is not a valid string. [' + stateName + ']');
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
        throw new Error('Name of the state is not a valid string. [' + options.name + ']');
      }
      if(!this.list[options.name]){
        throw new Error('State doesn\'t exists. [' + options.name + ']');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value. [' + options.data + ']');
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
        throw new Error('Name of the state is not a valid string. [' + options.name + ']');
      }
      if(options.data === null || options.data === undefined){
        throw new Error('State needs to contain a data value.[' + options.data + ']');
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
  
       
  // helper function for emptying node
  var emptyNode = function(node){
    while(node.firstChild){
      node.removeChild(node.firstChild);
    }
    node.offsetHeight = node.offsetHeight;
  }


  Rkn.prototype.component = {
    /*// setRenderMethod is required to use components. Here You can determine how do You want to render Your components (e.g. Pug/jQuery templates, jsx etc.)
    setRenderMethod: function(renderMethod){
      if(!renderMethod){
        throw new Error('Render method has not been defined.');
      }
    },*/

    // Rkn.component.renderedComponents contains all rendered components DOM ids as properties, and component names as a values
    renderedComponents: {},
    
    // Rkn.component.list property contains all current Rkn instance component instances
    list: {},
    
    // Rkn.component.counter is used for creating unique id for every Rkn component
    counter: 0,

    // Rkn.component.add adds new component to current Rkn instance
    add: function(options){
      // Add Rkn component method validation
      if(!options){
        throw new Error('No options for creating new components were provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the component is not a valid string. [' + options.name + ']');
      }
      /*if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }*/
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      if(this.list[options.name]){
        throw new Error('Component with given name already exists. [' + options.name + ']');
      }
      // "+" appends component node while rendering
      // "=" replaces wrapper content with component node while rendering
      if(!options.renderType){
        throw new Error('renderType of component has not been provided.');
      }
      if(options.renderType !== '+' && options.renderType !== '='){
        throw new Error('renderType of component has unexpected value. [' + options.renderType + ']');
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
        throw new Error('Given component name is not a valid string. [' + componentName + ']');
      }
      if(!this.list[componentName]){
        throw new Error('Component doesn\'t exists. [' + componentName + ']');
      }
      // Remove Rkn component
      delete this.list[componentName];
      // Return true as a success reponse
      return true;
    },
    
    // Rkn.component.get returns component based on given component name or, if doesn't exists - false
    get: function(componentName){
      // Get Rkn state object method validation
      if(!componentName || componentName.length === 0){
        throw new Error('State name has not been provided.');
      }
      if(typeof componentName !== 'string'){
        throw new Error('State name is not a valid string.[' + componentName + ']');
      }
      // If desired state doesn't exists, return false, otherwise return it as a success response.
      if(!this.list[componentName]){
        return false;
      }else{
        return this.list[componentName];
      }
    },

    // Rkn.component.update updates existing Rkn component based on given component object
    update: function(options){
      // Update Rkn component method validation
      if(!options){
        throw new Error('No options for creating new components were provided.');
      }
      if(!options.name || !options.name.length || typeof options.name !== 'string'){
        throw new Error('Name of the component is not a valid string. [' + options.name + ']');
      }/*
      if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }*/
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      // "+" appends component node while rendering
      // "=" replaces wrapper content with component node while rendering
      if(!options.renderType){
        throw new Error('renderType of component has not been provided.');
      }
      if(options.renderType !== '+' && options.renderType !== '='){
        throw new Error('renderType of component has unexpected value. [' + options.renderType + ']');
      }
      if(!this.list[options.name]){
        throw new Error('Component with given name doesn\'t exists.[' + options.name + ']');
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
        throw new Error('Name of the component is not a valid string. [' + options.name + ']');
      }/*
      if(options.data === null || options.data === undefined){
        throw new Error('Component data source has not been defined.');
      }*/
      if(options.template === null || options.template === undefined){
        throw new Error('Component template has not been provided.');
      }
      if(!options.wrapper){
        throw new Error('Component wrapper id has not been provided.');
      }
      // "+" appends component node while rendering
      // "=" replaces wrapper content with component node while rendering
      if(!options.renderType){
        throw new Error('renderType of component has not been provided.');
      }
      if(options.renderType !== '+' && options.renderType !== '='){
        throw new Error('renderType of component has unexpected value. [' + options.renderType + ']');
      }
      // Update or create existing Rkn component
      this.list[options.name] = options;
      // Return updated or created component as a success reponse
      return this.list[options.name];
    },

    // Rkn.component.render trigger render function,
    render: function(componentName, data){
      // helper variable that mark if given component was rendered before and should be on render replaced (renderType: '=')
      var renderedBefore = false;

      // Component render method validation
      if(!componentName || componentName.length === 0){
        throw new Error('Component name has not been provided.');
      }
      var component = this.list[componentName];
      
      if(!component){
        component = this.renderedComponents[componentName];
        // if component was found in renderedComponents list then it should have component property which points to parent component from Rkn component's list
        if(component && component.component){
          component = this.list[component.component];
          // update renderedBefore mark to true
          renderedBefore = true;
        }
      }
      // if component wasn't found either in components list and rendered components - then throw error
      if(!component){
        throw new Error('Component with given name doesn\'t exists. [' + componentName + ']');
      }
      /*
      if(!component.render || typeof component.render !== 'function'){
        throw new Error('Component with given name doesn\'t have render() method or it is not a function.'); 
      }
      */
      if(!component.wrapper || component.wrapper.length === 0){
        throw new Error('Component wrapper id is not defined.');
      }
      if(!component.renderType){
        throw new Error('renderType of component has not been provided.');
      }
      if(component.renderType !== '+' && component.renderType !== '='){
        throw new Error('renderType of component has unexpected value. [' + component.renderType + ']');
      }
      var wrapperNode = document.getElementById(component.wrapper);

      if(!wrapperNode){
        throw new Error('Component wrapper node has not been found. [' + component.wrapper + ']'); 
      }
      var renderNode = component.template(data);
      var counter = this.counter;
      var componentId;
      var renderedComponent = {};

      // check if node has been rendered before - if so then current name contains rkn counter in the name
      if(this.renderedComponents[componentName] !== undefined){
        componentId = componentName;
        counter = this.renderedComponents[componentName].id;
      }else{
        componentId = componentName + '-' + this.counter;
        counter = this.counter;
        this.counter++;
      }

      renderNode.id = componentId;
      renderNode.setAttribute('rkn-index', counter);
      // if component was rendered before it should replace existing component, if not, then behave like defined in component options
      if(!renderedBefore){
        // if renderType is '=', then clear wrapper node of child nodes first.
        if(component.renderType === '='){
          emptyNode(wrapperNode);
        } 
        wrapperNode.appendChild(renderNode);

        // add component to renderedComponents list
        this.renderedComponents[componentId] = {
          component: component.name,
          id: counter
        }
      }else{
        var oldNode = document.getElementById(componentName);
        if(!oldNode){
          throw new Error('Previously rendered component doesn\'t exist. [' + componentName + ']');
        }
        wrapperNode.replaceChild(renderNode, oldNode) 
        // add component to renderedComponents list
        this.renderedComponents[componentName] = {
          component: component.name,
          id: counter
        }
      }
      return renderNode;
    },


  } 


  // RKN ROUTER 

  
  Rkn.prototype.router = function(){
  
  }
  

    // bind newly created component to data source state
    // TODO
}());

