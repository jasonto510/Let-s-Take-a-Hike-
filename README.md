# Project Name
Let's Take a Hike

## Table of Contents
 - About
 - Usage
 - Requirements
 - Development
 
### About
I created this web application with the intention of making it easier for hikers to find trails in their area depending on a specified distance and number of trails. After rendering information from hiking project's api, I gave users the option of storing hikes and trails in their local mongo database for future use. Also, I gave users the option of getting specific local information and Google Map routes to their. Users also got the chance to update their equipment/inventory bag to ensure that they have everything that they might need for their trip.

### Some usage instructions

 - Go to https://openweathermap.org/api and https://developers.google.com/maps/documentation/ 
   - Create an account for both websites to receieve an API Key 
 - Create a config.js file to import the API keys 
 - npm start //to start the server/nodemon
 - npm run react-dev //To run webpack
 - The server should run on localhost:3000/

### Requirements

 - Node 6.13.0
 - Mongoose 5.4.10
 - Mongodb 3.1.13

### Development
This web application was designed to encourage users to find trails near them. I created a homepage with hiking facts and a section for users to enter in their location to find a specified number of trails(default 10) and distance(default 10 miles) near a specific longitude and latitude. Afterwards, users are given a choice to save the trail in their local Mongo Database and/or view the single location or all of the locations saved in their database. After designing this portion, I created a section for new or experienced hikers to create a list of gear needed for upcoming hikes.

### Installing Dependencies
From within the root directory:

 - npm install -g webpack
 - npm install
