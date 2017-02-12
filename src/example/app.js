// main app function 
(function(){
	var rkn = new Rkn();
  
  rkn.component.add({
    name: 'post-item',
    wrapper: 'post-list',
    renderType: '+',
    template: function(data){
      var li = document.createElement('LI');
      
      li.setAttribute('title', data.title);
      li.textContent = data.title + ', views: ' + data.views;
      return li;
    }
  })

  $.when(getPosts()).done(function(data){
    // add views parameter and set to 1
    data.forEach(function(post){
      return post.views = 0;
    });
    var posts = rkn.state.add({
      name: 'posts',
      data: data
    });

    renderPosts(posts);
    incrementPostViews();
  });


  function getPosts(){
    return $.get('https://jsonplaceholder.typicode.com/posts?_limit=10').done(function(resp){
      return resp;
    }).fail(function(err){
      console.warn(err);
      return false;
    });
  }

  function renderPosts(posts){
    posts.forEach(function(post){
      // lets render defined post-item component
      rkn.component.render('post-item', post);
    });  
  }

  function incrementPostViews(){
    document.getElementById('post-list').addEventListener('click', function(e){
      e.preventDefault();
      
      if(e.target.id.indexOf('post-item-') > -1){
        var idx = e.target.getAttribute('rkn-index');        
        var componentState = rkn.state.get('posts');
        
        componentState[idx].views++;
        rkn.state.update({
          name: 'posts',
          data: componentState
        });
        rkn.component.render(e.target.id, componentState[idx]);
        console.log('clicked!');
      }
    });
  }
}());

