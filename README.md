# canonical-tent-json
Generate canonical JSON for Tent posts. For [Tent 0.3](https://tent.io/docs/posts#canonical-post-json).

[![npm version](https://badge.fury.io/js/canonical-tent-json.svg)](http://badge.fury.io/js/canonical-tent-json)
[![Build Status](https://travis-ci.org/brooksn/canonical-tent-json.svg)](https://travis-ci.org/brooksn/canonical-tent-json)

## Installation

```shell
$ npm install canonical-tent-json
```

## Usage

```js
var canonical = require('canonical-tent-json');
var post = {
  "original_entity": "https://example.com",
  "entity": "https://example.net",
  "type": "https://tent.io/types/status/v0",
  "content": {
    "text": "Hello world!"
  },
  "published_at": 1450396800
};

var newcanonicalpost = canonical(post);
Object.is(post, newcanonicalpost); //false
var version_id = newcanonicalpost.versionID();
//sha512t256-8c71c9113e53a23eaf1a7ac763e8759f2aa88cb73d50564a6c0ba46263e851d1
```
