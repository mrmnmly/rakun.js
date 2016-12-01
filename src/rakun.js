// Rcn a.k.a. Rakun a.k.a. Raccoon
function Rcn(){
	var _self = this;

	// add '#' to app url on init
	if(window.location.href.indexOf('#/') < 0){
		window.location.href += '#/';
		// url += '#/';
		// window.location.href = url;
	}
}

Rcn.prototype.newRouter = function(){
	console.log('new router!')
	var _self = this;
	var _routes = [];


	// TODO:
	// pass in newRouter option params error route templates (e.g. 404, 500 etc.)


	window.onload = function(){
		if(_routes.length){
			self.detectRoute();
			// TODO activate route
		}
	};


	// binding event listener on hash location change automatically when create new router
	window.addEventListener('hashchange', function(){
		console.log('location changed!');
		if(!window.location.href || !window.location.href.indexOf('#') < 0){
			throw new Error('Something went wrong with url (# mark is missing).');
		}

		_self.checkRoute();
	});

	// function that parses current location href and search for specific route
	_self.checkRoute = function(){
		var self = this;
		var currentUrl = window.location.href;
		// get location url value after '#'
		var currentRoute = currentUrl.split('#')[1];

		// probably temporary solution!
		// TODO: fix it
		var route = _routes.filter(function(obj){
			return obj.url == currentRoute;
		});

		// validation
		if(!route && !route.length){
			// TODO: think about raising 404 error page here (if defined) instead of console error
			throw new Error('Route not found!');
		}

		_self.activateRoute(route[0]);
	};

	// function that creates new route object and adds it to _routes array
	// options params example:
	_self.newRoute = function(options){
		var self = this;

		// validation start
		if(!options){
			throw new Error('No newRoute() function params provided.');
		}
		if(!options.name || !options.name.length){
			throw new Error('No route name specified.');
		}
		if(!options.url || !options.url.length){
			throw new Error('No route url path specified.');
		}
		if(!options.wrapper || !options.wrapper.length){
			throw new Error('No route wrapper dom id specified.');
		}
		if(!document.getElementById(options.wrapper)){
			throw new Error('Route DOM wrapper not found in document.');
		}
		if(!options.template && !options.templateUrl){
			throw new Error('You should specify template or templateUrl.');
		}
		if(options.template && options.templateUrl){
			throw new Error('You cannot specify template and templateUrl at the same time.');
		}
		// TODO: add validation if options.beforeRender is defined, then check if it is a function


		// validation end


		// add route to _routes array
		_routes.push(options);
		console.log(_routes);

		return options;
	};

	// activate given route in app
	_self.activateRoute = function(route){
		// TODO: add some function that hides all other routes (based on _routes array wrappers or something)

		// TODO: add promise-based, async getting route.renderData (let's fetch it in the meantime of doing other stuff below, before handling route.beforeRender)

		var wrapper = document.getElementById(route.wrapper);
		var templateFragment = document.createDocumentFragment();
		// create a holder node that will be a holder for our string-based HTML template code
		var holder = document.createElement("div");

		// if template was defined in route
		if(route.template){
			// TODO: add handling Handlebars or something in route.template variable before inserting into templateFragment

			holder.innerHTML = route.template;
			templateFragment.appendChild(holder);
			// TODO - add code to remove holder from document fragment immediately after inserting it in above line
		}else{
			// if template has not been defined, then templateUrl was
			// TODO: add template load and other stuff here;
		}
		// handle beforeRender method on created documentFragment
		if(route.beforeRender){
			// TODO: add when(route.renderData).then(..) before invoking route.beforeRender (because in future we will want to use that data in beforeRender function)
			route.beforeRender(templateFragment);
			setTimeout(function(){
				wrapper.innerHTML = '';
				console.log(templateFragment);
				wrapper.appendChild(templateFragment);
			}, 0);
		}
	}


	// return router object
	return _self;
}