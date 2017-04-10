module.exports = {
  servers: {
    one: {
      // host: 'ec2-35-163-139-178.us-west-2.compute.amazonaws.com',
      host: 'dashboard.chronicinktattoo.com',
      // username: 'ubuntu',
      username: 'jason',
      // pem: 'coil-website.pem'
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