var versionID = require('./version-id.js');
var canonicalPostJSON = function(originalpost){
  var post = JSON.parse(JSON.stringify(originalpost));
/**
  * 7. The permissions, app.id, received_at, version.received_at and version.id members are removed.
  * 8. Elements of the mentions array with the public member set to false are removed.
  * 9. All original_entity members (in the post object as well as mentions, refs, and
  * version.parents array elements) are removed and their sibling entity members
  * values are replaced with the original_entity value.
  * 10. Empty members are removed. The members that may be empty are app, attachments,
  * mentions, refs, content, licenses, version.parents, version.message, and version.
  * 11. Optional members that contain redundant data are removed. Currently this is defined
  * as the post and entity members of a version.parents, mentions, and refs array element
  * when they refer to the identifier or entity of the post that contains them.
**/

  if (post.original_entity) post.entity = post.original_entity;
  delete post.original_entity;
  delete post.permissions;
  if (post.app) delete post.app.id;
  delete post.received_at;
  if (post.version) {
    delete post.version.received_at;
    delete post.version.id;
  }
  if (post.mentions && Array.isArray(post.mentions)) {
    for (var m in post.mentions) {
      if (post.mentions[m].public === false) post.mentions.splice(m,1);
      if (post.mentions[m].original_entity) {
        post.mentions[m].entity = post.mentions[m].original_entity;
        delete post.mentions[m].original_entity;
      }
    }
  }
  if (post.refs && Array.isArray(post.refs)) {
    for (var r in post.refs) {
      if (post.refs[r].original_entity) {
        post.refs[r].entity = post.refs[r].original_entity;
        delete post.refs[r].original_entity;
      }
    }
  }
  if (post.version && post.version.parents && Array.isArray(post.version.parents)) {
    for (var p in post.version.parents) {
      if (post.version.parents[p].original_entity) {
        post.version.parents[p].entity = post.version.parents[p].original_entity;
        delete post.version.parents[p].original_entity;
      }
    }
  }

  var isObject = function(object){
    return Object.prototype.toString.call(object) === '[object Object]';
  };

  var canonical = {};

  var keySort = function(object){
    if (!isObject(object) && !Array.isArray(object)) return;
    if (object === null) return;
    var freshObject;
    if (isObject(object)) freshObject = {};
    if (Array.isArray(object)) freshObject = [];

    var keys = Object.keys(object).sort();

    for (var i=0; i<keys.length; i++){
      var child = null;
      if (typeof object[keys[i]] === 'number' && Number.isInteger(object[keys[i]])) {
        freshObject[keys[i]] = object[keys[i]];
      } else if (isObject(object[keys[i]])) {
        child = keySort(object[keys[i]]);
        if (isObject(child)) freshObject[keys[i]] = child;
      } else if (typeof object[keys[i]] === 'string') {
        freshObject[keys[i]] = object[keys[i]];
      } else if(Array.isArray(object[keys[i]])) {
        child = keySort(object[keys[i]]);
        if (Array.isArray(child)) freshObject[keys[i]] = child;
      } else if(typeof object[keys[i]] === 'boolean') {
        freshObject[keys[i]] = object[keys[i]];
      }
    }

    var hasFreshKeys = false;
    for (var k in freshObject) hasFreshKeys = true;
    if (Array.isArray(freshObject)){
      freshObject.sort();
      for(var n = freshObject.length - 1; n >= 0; n--) {
        if (freshObject[n] === null) freshObject.pop();
      }
    }
    if (hasFreshKeys === true) return freshObject;
    return;
  };
  canonical = keySort(post);
  canonical.versionID = versionID;
  return canonical;
};

module.exports = canonicalPostJSON;
