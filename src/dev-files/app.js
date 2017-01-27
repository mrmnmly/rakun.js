// main app function 
(function(){
	var rkn = new Rkn();
  
  $.when(getPosts()).done(function(data){
    rkn.state.add({
      name: 'posts',
      data: data
    });
    
    console.log(rkn.state.list);
  });  
}());

function getPosts(){
  return $.get('posts.json').done(function(resp){
    return resp;
  }).fail(function(err){
    console.warn(err);
    return false;
  });
}
