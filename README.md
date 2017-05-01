# Chronic Ink Internal Dashboard

## Features
- Dashboard view with widgets
  - Intake List widget to show a list of clients who have filled out an intake form and are waiting for a consultation
  - Artist Stats widget to show calendar info for each artist, such as soonest opening and overall booking volume over a given period
- Intake Form
  - A client-facing form that allows Chronic Ink to collect client info and make it easily accessible for future applications
- Booking Form
  - An internal-use form that allows Chronic Ink staff to record details about a piece, save and come back to the form later, and submit the details so events are automatically created in the calendar and reminders are automatically sent to the client, the artist, and the studio.
- Shop forms
  - Links to google forms that are used to collect info about the shop


## Setting Up Development Environment

Install [Node.js](https://nodejs.org/en/). Install [Meteor](https://www.meteor.com/). Clone this repository. 

Run:

`npm install`

`meteor --settings settings.json`

You will notice errors, this is normal. The MongoDB instance running on port 3001 is missing some vital data. 

Import `artists.json` into your DB with 

`mongoimport --db meteor --collection artist --file artist.json --jsonArray`

Add this object as a document into your `studio` collection:

```
{
	"name" : "Chronic Ink",
	"emails" : {
		"primary" : "chronicinktesting@gmail.com",
		"clientFacing" : "chronicinktesting@gmail.com",
		"qualityControl" : "chronicinktesting@gmail.com",
		"other" : [ ]
	},
	"widgets" : [
		"intakeList",
		"artistStats"
	],
	"staff" : [ ]
}
```

## Setting up Meteor Up To Push To Production

Install [Meteor Up](https://github.com/zodern/meteor-up) with 

`npm install -g mup`

In the `.deploy` directory of the project, there is a `mup.js` file that specifies the configuration. Under the `servers` property there are keys `one`, `two`, etc that have the specifications for different servers we can deploy to. The one with host `dashboard.chronicinktattoo.com` is the production server. Under the `meteor.servers` setting, specify which of the servers you want to deploy to when you run the deployment command. Change the ROOT_URL environment variable to the url of the server you are deploying to this time. There is also a `settings.json` file that specifies what settings to pass to the Meteor instance that is deployed.

In the `.deploy` directory, just run 

`mup deploy`

to deploy to the server specified in `mup.js`. Deployments done using mup run in a docker container that can be accessed with the commands:

`docker exec -it chronicink-dashboard bash` for the Meteor instance.

`docker exec -it mongodb bash` for the MongoDB instance.

To directly connect to the containerized MongoDB instance, use the command:

`docker exec -it mongodb mongo chronicink-dashboard`

**Keep in mind that this will build and deploy the project in its current state in your local repository, so PLEASE MAKE SURE that your repo is synced up with the upstream before you deploy. Any errant changes in your local project WILL be incorporated into the build and deployed to the server**
