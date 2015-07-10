module.exports.ok = {
  id: 'abc',
  entity: 'https://example.com',
  type: 'status',
  content: 'Hello world!',
  mentions: [
    {
      post: 'ghi'
    }
  ],
  refs: [
    {
      post: 'def'
    }
  ],
  version: {
    parents: [
      {
        version: 'xyz'
      }
    ]
  }
};
module.exports.redundant = {
  id: 'abc',
  entity: 'https://example.com',
  type: 'status',
  content: 'Hello world!',
  mentions: [
    {
      post: 'ghi',
      entity: 'https://example.com'
    }
  ],
  refs: [
    {
      entity: 'https://example.com',
      post: 'def'
    }
  ],
  version: {
    parents: [
      {
        version: 'xyz',
        post: 'abc',
        entity: 'https://example.com'
      }
    ]
  }
};
