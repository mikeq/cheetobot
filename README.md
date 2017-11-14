# CheetoBot - a slack bot

[![CircleCI](https://circleci.com/gh/mikeq/cheetobot/tree/master.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/mikeq/cheetobot/tree/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Requirements
- NodeJS 9.0.0
- yarn 1.3.2
- git
- heroku (if using for deployment)

## Clone the repository
```
C:\Users\mike> git clone git@github.com:mikeq/cheetobot.git
```

## Install dependencies
```
C:\Users\mike> cd cheetobot
C:\Users\mike\cheetobot> yarn
```

## Deploy with Heroku
Create an account on [Heroku](https://dashboard.heroku.com/) if you do not already have one

### Install the heroku cli
```
yarn global add heroku-cli
```

### login to heroku
```
C:\Users\mike\cheetobot> heroku login
Enter your Heroku credentials:       
Email: example@example.com      
Password: ************               
Logged in as example@example.com
```
### Create a heroku app
```
C:\Users\mike\cheetobot> heroku create
Creating app... done, calm-caverns-70820                                                 
https://calm-caverns-70820.herokuapp.com/ | https://git.heroku.com/calm-caverns-70820.git
```
Heroku will create a randomly named app

### Attach a mongoDB addon
```
C:\Users\mike\cheetobot> heroku addons:create mongolab:sandbox
Creating mongolab:sandbox on calm-caverns-70820... free
Welcome to mLab.  Your new subscription is being created and will be available shortly.  Please consult the mLab Add-on Admin UI to check on its progress.
Created mongolab-cubic-53817 as MONGODB_URI
Use heroku addons:docs mongolab to view documentation
```
Heroku automatically creates an environment variable that points to the mongoDB uri.
You can see this in the settings page on the application page on the heroku site, or
from the command line

### Listing config
```
C:\Users\mike\cheetobot> heroku config
=== calm-caverns-70820 Config Vars
MONGODB_URI: mongodb://heroku_h2c97z7v:duts8vm0o0n849puqvdaura72k@ds257495.mlab.com:57495/heroku_h2c97z7v
```

### Add user to access your mongoDB database

#### Go to the mLab mongoDB
![Click link in app overview](images/heroku-mlab-link.png)

Click the mLab MongoDB link, on the mLab page add a database user

![Add database user](images/mlab-db-users.png)

#### Set mLab environment variables
Back on the command line add the user/password you set as environment variables
```
C:\Users\mike\cheetobot> heroku config:set mongouser=youruser
Setting mongouser and restarting calm-caverns-70820... done, v4
mongouser: youruser
```
```
C:\Users\mike\cheetobot> heroku config:set mongopass=yourpass
Setting mongopass and restarting calm-caverns-70820... done, v4
mongouser: yourpass
```
Your heroku application now has the ability to connect to the mLab MongoDB database

### Add an application to your Slack workspace
Go to your [applications](https://api.slack.com/apps) page on slack. Create a new app

![create new app](images/slack-create-app.png)

Choose a name for your app and the Workspace to install it to.

#### Add a new Bot User
![Add Bot User](images/slack-add-bot.png)
Give your bot a display name and default username, then click "Add Bot User"

#### Install app into your Workspace
![Install app into your workspace](images/slack-install-app.png)

You will then have a Bot User OAuth Access token generated, copy this value
![Copy bot token](images/slack-bot-token.png)

#### Set slack bot environment variables
```
C:\Users\mike\cheetobot> heroku config:set token=xoxb-271523841441-nntmjf38fxWC5eGteRkQrjdH
Setting token and restarting calm-caverns-70820... done, v6
token: xoxb-271523841441-nntmjf38fxWC5eGteRkQrjdH
```

### Check config
You should have the following set.
```
C:\Users\mike\cheetobot> heroku config
=== calm-caverns-70820 Config Vars
MONGODB_URI: mongodb://heroku_h2c97z7v:duts8vm0o0n849puqvdaura72k@ds257495.mlab.com:57495/heroku_h2c97z7v
mongopass:   yourpass
mongouser:   youruser
token:       xoxb-271523841441-nntmjf38fxWC5eGteRkQrjdH
```

### Push the code to heroku
```
C:\Users\mike\cheetobot> git push heroku master
...
```
This will push the code, build and deploy it.

### Start the bot worker
The bot does not require the default 'web' heroku service to run, so disable that and run the
'worker' service
```
C:\Users\mike\cheetobot> heroku ps:scale web=0
Scaling dynos... done, now running web at 0:Free
...
C:\Users\mike\cheetobot> heroku ps:scale worker=1
Scaling dynos... done, now running worker at 1:Free
```

You can check what 'dynos' are running
```
C:\Users\mike\cheetobot> heroku ps
Free dyno hours quota remaining this month: 898h 19m (89%)
For more information on dyno sleeping and how to upgrade, see:
https://devcenter.heroku.com/articles/dyno-sleeping

=== worker (Free): yarn bot (1)
worker.1: up 2017/11/14 13:35:56 +0000 (~ 1h ago)
```

### Check bot is now active
![active bot](images/slack-active-bot.png)
Your bot should now appear active in Slack (mybot in my case)

#### Invite bot to channel
Invite the bot into the channel, then test with an expletive
/invite @mybot

![Bot test](images/slack-success.png)

If all goes well then the bot should respond

