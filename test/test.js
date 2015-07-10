var test = require('tape');
var canonicalJSON = require('../index.js');
var posts = require('./posts.js');
var versionID = require('../version-id.js');
var matching = require('./matching-posts.js');

test('generate matching version ids', function(a){
  a.plan(7);
  for (var index = 0; index < 6; index++) {
    var post = canonicalJSON(posts[index]);
    var json = JSON.stringify(post);
    var versionid = post.versionID(json);
    a.equal(versionid, posts[index].version.id);
  }
  var post1 = canonicalJSON(matching.ok);
  var versionid1 = post1.versionID();
  var post2 = canonicalJSON(matching.redundant);
  var versionid2 = post2.versionID();
  a.equal(versionid1, versionid2, 'Redundant fields are removed.');
  a.end()
});
