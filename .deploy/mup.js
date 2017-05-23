module.exports = {
    servers: {
        staging: {
            host: 'ec2-35-163-139-178.us-west-2.compute.amazonaws.com',
            username: 'ubuntu',
            pem: 'coil-website.pem'
        },
        production: {
            host: 'dashboard.chronicinktattoo.com',
            username: 'jason',
            password: 'Shift123!'
            // or leave blank for authenticate from ssh-agent
        }
    },

    meteor: {
        name: 'chronicink-dashboard',
        path: '../',
        servers: {
            staging: {}
        },
        buildOptions: {
            serverOnly: true,
        },
        env: {
            // ROOT_URL: 'http://dashboard.chronicinktattoo.com',
            ROOT_URL: 'http://ec2-35-163-139-178.us-west-2.compute.amazonaws.com',
            MONGO_URL: 'mongodb://localhost/meteor'
        },

        dockerImage: 'abernix/meteord:base',
        deployCheckWaitTime: 60
    },

    mongo: {
        oplog: true,
        port: 27017,
        servers: {
            staging: {},
        },
    },
};