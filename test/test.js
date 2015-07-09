var test = require('tape');
var canonicalJSON = require('../index.js');
var posts = require('./posts.js');
var versionID = require('../version-id.js');

test('generate matching version ids', function(a){
  a.plan(6);
  for (var index = 0; index < 6; index++) {
    a.comment('index: ' + index);
    var post = canonicalJSON(posts[index]);
    var json = JSON.stringify(post);
    var versionid = post.versionID(json);
    a.equal(versionid, posts[index].version.id);
  }
});
