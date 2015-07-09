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
//sha512t256-e48360a724ccbbebea46e44a9836fe304811f4aaca9ab214bd56ec89e6ed854d
```
