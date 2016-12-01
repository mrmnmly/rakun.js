(function(){
	var app = new Rcn();
	var appRouter = app.newRouter();

	var homeRoute = appRouter.newRoute({
		name: 'home',
		url: '/',
		renderData: function(){
			return {name: "lukasz", technologies: ['javascript', 'node.js', 'phonegap', 'express.js']};
		},
		wrapper: 'id-home-wrapper',
		beforeRender: function(template){
			// renderData.technologies.push('git');
			// console.log(renderData.name);
			template.querySelector('strong').innerText += ' olaboga!';
		},
		template: '<strong>BLA!</strong>'
	});

	if(window.location.hash == '#/'){
		appRouter.activateRoute(homeRoute);
	}else{
		// TODO: write function that gets current window.location.hash and search for proper route
		appRouter.detectRoute();
	}



	// window.location.href = window.location.pathname;
}());