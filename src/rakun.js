function Rcn(){
  var _self = this;
  // array of all states
  _self.stateBox = [];
  // array of all routes
  _self.routeBox = [];
  // array of all components
  _self.componentBox = [];

  // add '#' to app url on init
  _self.addHashToUrl = (function(){
    if(window.location.href.indexOf('#/') < 0){
      var url = window.location.href.replace(/#\//g, '');
      url += '#/';
      window.location.href = url;
    }
  }());

  return _self;
}

// router manages all the routes
Rcn.prototype.newRouter = function(){
  var _self = this;

  // binding hash change event
  _self.bindHashChangeEvent = (function(){
    window.addEventListener('hashchange', function(){
      if(!window.location.href || !window.location.href.indexOf('#') < 0){
        throw new Error('Something went wrong (missing \'#\')');
      }
      _self.findRoute(window.location.href.split('#')[1], true);
    });
  }());

  // create new route and add it to _self.routeBox array (array of all routes)
  _self.newRoute = function(options){
    var self = this;

    // newRoute options validation
    if(!options){
      throw new Error('No route params provided!');
    }
    if(!options.name || !options.name.length){
      throw new Error('No route name specified!');
    }
    if(options.name.indexOf('/') > -1){
      throw new Error('Route name shouldn\'t contain slash (/) character!');
    }
    if(!options.url || !options.url.length){
      throw new Error('No route url specified!');
    }
    if(!options.wrapper || !options.wrapper.length){
      throw new Error('No route wrapper DOM id specified!');
    }
    if(!document.getElementById(options.wrapper)){
      throw new Error('Route DOM wrapper not found in document!');
    }
    if(!options.template && !options.templateUrl){
      console.log(options)
      throw new Error('No route template specified!');
    }
    if(options.template && options.templateUrl){
      throw new Error('Template and templateUrl specified at the same time!');
    }

    // add newRoute object to _self.routeBox array (array of all routes)
    _self.routeBox.push(options);

    // reurn newRoute object
    return self;
  }

  // choose which mechanism to use depends on provided routeToFind param (route name or route url)
  // route name will not contain slash character (/)
  _self.findRoute = function(routeToFind, redirect){
    if(routeToFind || routeToFind.length || typeof routeToFind === 'string'){
      if(routeToFind.indexOf('/') > -1){
        return _self.findRouteByUrl(routeToFind, redirect);
      }else{
        return _self.findRouteByName(routeToFind, redirect);
      }
    }else{
      throw new Error('No route to find specified or is not a string!');
    }
  }

  // find current route in _self.routeBox array (array of all routes) by given url
  _self.findRouteByUrl = function(href, redirect){
    // validation
    if(!href || !href.length || typeof href != 'string'){
      throw new Error('No route href specified or is not a string!');
    }
    var currentRoute = _self.routeBox.filter(function(obj){
      return obj.url === href;
    });
    // validation
    if(!currentRoute.length){
      console.warn('Route not found!', href);
      return;
    }
    // activate found route if redirect is true
    if(redirect === true){
      _self.activateRoute(currentRoute[0]);
    }
    // return found route
    return currentRoute[0];
  }

  // find current route in _self.routeBox array (array of all routes) by given route name
  _self.findRouteByName = function(name, redirect){
    //validation
    if(!name || !name.length || typeof name != 'string'){
      throw new Error('No route name specified or is not a string!');
    }
    var currentRoute = _self.routeBox.filter(function(obj){
      return obj.name === name;
    });

    // validation
    if(!currentRoute.length){
      console.warn('Route not found!');
      return;
    }
    // activate found route if redirect is true
    if(redirect === true){
      _self.activateRoute(currentRoute[0]);
    }
    // return found route
    return currentRoute[0];
  }

  // activate given route in app
  // route param can be a string [existing route name] or route object
  _self.activateRoute = function(route, params){
    // if given route was a string, then search for it in _self.routeBox (array of all routes)
    if(typeof route === 'string'){
      route = _self.findRoute(route);
    }
    var wrapper = document.getElementById(route.wrapper);
    var templateFragment = document.createDocumentFragment();
    // create container that will wrap whole template (will be removed later, after render TODO)
    var container = document.createElement('div');
    // wrapper validation
    if(!wrapper){
      throw new Error('Route wrapper does not exist in document!');
    }
    // template validation
    if(route.template){
      container.innerHTML = route.template();
      templateFragment.appendChild(container);
      // TODO - add code to remove holder from document fragment immediately after inserting it in above line
    }else if(route.templateUrl){
      // if template has not been defined, then templateUrl should be
      // TODO: add template load and other stuff here;
    }else{
      throw new Error('Template not defined!');
    }

    // handle beforeRender [optional param] method (passed templateFragmet is for accessing template from that function)  
    if(route.beforeRender){
      route.beforeRender(templateFragment);
    }

    // for the first time, route will not be mounted, so we need to insert it into app template
    // it will also run every time, if we set route.resetTemplate to true
    if(!route.mounted || route.resetTemplate === true){
      route.mounted === true;
      wrapper.innerHTML = '';
      wrapper.appendChild(templateFragment);
      if(route.afterRender && typeof route.afterRender === 'function'){
        setTimeout(function(){
          route.afterRender();
        }, 0);
      }
    }
  }

  // redirect app using Rcn built-in mechanism (but we can also do it in traditional way)
  _self.redirect = function(routeName, routeParams){
    var route = _self.findRoute(routeName);

    if(route && route.url){
      console.log('redirect: ', routeName)
      window.location.hash = route.url;
      // _self.activateRoute(routeName, routeParams);
    }else{
      throw new Error('Redirection failed - route not found');
    }
  }

  // return new router object
  return _self;
}

Rcn.prototype.newComponent = function(options){
    var _self = this;

    if(!options.name || !options.name.length){
        throw new Error('No component name provided!');
    }
    if(!options.wrapper){
        throw new Error('No component wrapper id provided!');
    }

    // prepare template & necessary variables for rendering
    var wrapper = document.getElementById(options.wrapper);
    var templateFragment = document.createDocumentFragment();
    // create container that will wrap whole template (will be removed later, after render TODO)
    var container = document.createElement('div');

    if(!wrapper){
        throw new Error('Component wrapper DOM element not found!');
    }
    if(!options.template){
        throw new Error('Component template not provided!');
    }
    container.innerHTML = options.template();
      // templateFragment.appendChild(container);

    // optional beforeRender method
    if(options.beforeRender){
      options.beforeRender(templateFragment);
    }
    if(!options.render){
        throw new Error('Render method not provided!');
    }

    // add new component to componentBox array (array of all components)
    _self.componentBox.push(options);

    // define render method for every new component
    options.render = function(){
        wrapper.appendChild(templateFragment);
        if(options.afterRender && typeof options.afterRender === 'function'){
            setTimeout(function(){
                options.afterRender();
            }, 0);
        }
    }

    // return new component object
    return _self;
}

// find state in _self.stateBox by given state name
// if getValue is true, then this method returns state data value instead of whole state object
Rcn.prototype.findState = function(stateName, getValue){
  var _self = this;

  if(!stateName){
    throw new Error('No state name provided!');
  }

  var state = _self.stateBox.filter(function(obj){
    return obj.name = stateName;
  });

  if(state && state.length){
    if(getValue){
      return state[0].data();
    }else{
      return state[0];
    }
  }else{
    return;
  }
}

// create new state and add it to _self.stateBox array (array of all states)
Rcn.prototype.newState = function(options){
  var _self = this;
  var states = _self.stateBox;

  // newState options validation
  if(!options){
    throw new Error('No state params provided!');
  }
  if(!options.name || !options.name.length){
    throw new Error('No state name provided!');
  }
  // add state to _self.stateBox array (array of all states)
  states.push(options);
  // return new state object
  return _self;
}

// remove state from _self.stateBox array (array of all states)
Rcn.prototype.removeState = function(stateName){
  var _self = this;

  if(!stateName){
    throw new Error('No state name provided!');
  }

  var state = _self.stateBox.filter(function(obj){
    return obj.name = stateName;
  });

  if(state && state.length){
    var idx = _self.stateBox.indexOf(state);
    
    if(idx != -1){
      _self.stateBox.splice(idx, 1);
      return true;
    }
  }
  return _self;
}