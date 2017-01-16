module.exports = {
  servers: {
    one: {
      host: 'vps113216.vps.ovh.ca',
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
      ROOT_URL: 'http://vps113216.vps.ovh.ca',
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