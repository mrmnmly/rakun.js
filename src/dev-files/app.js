(function(){
	var app = new Rcn();
	var appRouter = app.newRouter();

	appRouter.newRoute({
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
}());