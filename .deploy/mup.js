module.exports = {
  servers: {
    one: {
      host: 'dashboard.chronicinktattoo.com',
      username: 'jason',
      // pem:
      password: 'Shift123!'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'chronicink-dashboard',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://dashboard.chronicinktattoo.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base', 
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};