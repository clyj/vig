export = [{
  urls: ['/validations'],
  routers: {
    methods: ['get', 'post', 'bad'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res) {
      res.send('post');
    }
  },
  conditions: {
    get: async (req, res, scope) => {
      return(true);
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(true);
    },
    post: async (req, res, scope) => {
      return(false);
    }
  }
}, {
  urls: ['/validations/2'],
  routers: {
    methods: ['get', 'post', 'bad'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res, scope) {
      if (scope.extracted) {
        res.json(scope.extracted);
      } else {
        res.send('post');
      }
    }
  },
  conditions: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: async (req, res, scope) => {
      return(true);
    }
  },
  failures: {
    validation: function (error, req, res) {
      res.status(403).send('Access Denied Due to Failure to validations');
    },
    condition: function (error, req, res) {
      res.status(403).send('Access Denied Due to Failure to conditions');
    },
    sdfsfddf: function() {

    },
    1: {
      
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: {
      required: ['body'],
      query: {
        username: {
          type: 'string',
          required: true,
          maxLength: 30,
          minLength: 2
        },
        password: {
          type: 'string',
          required: true,
          minLength: 6,
          maxLength: 30
        }
      },
      params: {
        id: {
          type: 'int',
          required: true
        }
      },
      body: {
        value: {
          type: 'int',
          required: true
        }
      }
    }
  }
}, {
  urls: ['/params/:id'],
  routers: {
    methods: ['get', 'post'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res) {
      res.send('post');
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: {
      params: {
        id: {
          type: 'int',
          required: true
        }
      }
    }
  }
}, {
  urls: ['/post/:id'],
  routers: {
    methods: ['get', 'post'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res) {
      res.send('post');
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: {
      required: ['body'],
      body: {
        data: {
          type: 'int',
          required: true
        }
      }
    }
  }
}, {
  urls: ['/unded/:id'],
  routers: {
    methods: ['get', 'post'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res) {
      res.send('post');
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: {
      required: {},
      body: {
        data: {
          type: 'int',
          required: true
        }
      }
    }
  }
}, {
  urls: ['/nag/:id'],
  routers: {
    methods: ['get', 'post'],
    get: function (req, res) {
      res.send('get');
    },
    post: function (req, res) {
      res.send('post');
    }
  },
  validations: {
    get: async (req, res, scope) => {
      return(false);
    },
    post: {
      required: [],
      body: {
        data: {
          type: 'int',
          required: true
        }
      }
    }
  }
}];
