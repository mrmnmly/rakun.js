// main app function 
(function(){
	var rkn = new Rkn();
  
  rkn.component.add({
    name: 'post-item',
    template: function(data){
      var li = document.createElement('LI');
      
      li.setAttribute('title', data.title);
    }
  })



  $.when(getPosts()).done(function(data){
    // add views parameter and set to 1
    data.forEach(function(post){
      return post.views = 0;
    });
    rkn.state.add({
      name: 'posts',
      data: data
    });

    console.log(rkn.state.list);
  });

}());

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
    rkn.component.render('post-item', post);
  });  
}
