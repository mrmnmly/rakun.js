function Home(rcn, rcnRouter){
	var _self = this;
	var Rcn = rcn;
	var Router = rcnRouter;
	var homeState = Rcn.newState({
		name: 'homeState',
		data: function(){
			return $.get('posts.json').done(function(resp){
				if(!resp.roles && !resp.roles.length){
					resp.roles = ['front-end developer', 'mobile developer', 'web maker', 'entrepreneur'];
				}
				return resp;
			}).error(function(err){
				console.warn(resp);
				return;
			});
		}
	});

	_self.homeRoute = Router.newRoute({
		name: 'home',
		url: '/',
		template: function(data){
			return '<h1>lukaszkups</h1><p>Hi, I\'m a <span id="' + this.data.roles[0] + '"></span></p>';
		},
		data: function(){
			return homeState;
		}
		beforeRender: function(this.template, this.data){

		}
	})

	return _self;
}