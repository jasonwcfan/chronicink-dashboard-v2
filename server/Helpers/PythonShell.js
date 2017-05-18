import Shell from 'python-shell';
import path from 'path';

const PythonShell = {
    /**
     * An async function that calls run to spawn a python script to recommend artists given the input values
     * @param style the tattoo style (String)
     * @returns {Promise}
     */
    recommendArtist: async function(style) {
        const data = {
            tattooStyle: style
        };

        const options = {
            mode: 'json',
            scriptPath: path.join(process.env.PWD, __dirname, 'ArtistRecommendation'),
            pythonPath: Meteor.settings.public.pythonPath
        };

        // await is a new ES6 feature that waits until this Promise is fulfilled before return the value
        return await new Promise((resolve, reject) => {
            run(data, 'recommend.py', options, resolve, reject);
        });
    }
};

/**
 * runs a python script
 * @param data the data to pass to the script
 * @param script the name of the script
 * @param options the PythonShell options to run the script with
 * @param resolve called to resolve this Promise
 * @param reject called to reject this Promise
 */
function run(data, script, options, resolve, reject) {
    shell = new Shell(script, options);
    shell.send(data);

    shell.on('error', function(err) {
        reject(err);
    });

    shell.on('message', function(message) {
        console.log(message);
        resolve(message);
    });
}

export default PythonShell;