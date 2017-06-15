const $ = require('jquery');
const jsdom = require('jsdom');
const m = require('module');

const originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) {
    return {
      uri: request
    };
  }

  return originalLoader(request, parent, isMain);
};


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', {
  url: 'http://localhost'
});
global.document = doc;
global.window = doc.defaultView;


global.localStorage = {
  getItem: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjIsIlJvbGVJZCI6MSwidXNlciI6ImFkbWluIiwiaWF0IjoxNDkyODkxNzEzLCJleHAiOjE0OTI5NzgxMTN9.bJ5OMykjtl1xwEwBYK7EJ07qcF95Oi6isIO0PdBwYEQ',
  setItem: () => null,
};

Object.keys(doc.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = doc.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.Materialize = {
  toast: () => null,
};
