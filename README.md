

# Bootcamp Challenge Week Eleven - ExpressJS: Note taking API server application
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## Description

The purpose of this application is to test my knowledge of Node-js and ExpressJS, by producing a simple API server to serve the public html and javascript and provide full functionality.

This application makes it easy for the user to take a series of notes for viewing later.

During this project I learnt how to create API routes and how to provide the required information to an exisiting front end.

## Table of Contents
    
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Testing](#testing)
- [Usage](#usage)
- [Screenshots/Video](<#screenshots--video-of-completed-challenge>)
- [License](#license)
- [Credits](#credits)
- [Questions / How to Contribute](#questions--how-to-contribute)

## User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

## Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
WHEN I click on the Save button
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
WHEN I click on the "New Note" button in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears
Mock-Up
```
## Bonus
```
DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
```

## Installation

Clone the repo to a local folder and then from the terminal inside the main directory, run the following command to install the necessary dependancies.
       
    npm install -y

## Testing

No self tests exist for this application

## Usage
    
Open the terminal in the Root Folder and enter the following command.

    npm run start

Then navigate to the link provided in the command line. 


## GitHub repository
https://github.com/mlewis89/wk11_ExpressJs_Note-Taker

## Heroku Hosting
https://agile-citadel-28187-7464f8284b7b.herokuapp.com/

## Screenshots / Video of Completed Challenge

![completed application](/assets/Capture1.PNG)
![completed application](/assets/Capture2.PNG)
![completed application](/assets/Capture3.PNG)
![completed application](/assets/Capture4.PNG)

## License
This project is licensed under the MIT.
    
## Questions / How to Contribute
    
If you have any questions about the repo, open an issue. You can veiw my other work on git hub [mlewis89](https://github.com/mlewis89/)

## Credits

Monash University Full Stack Coding bootcamp


---
