# capstone-project-ss-h
capstone-project-ss-h created by GitHub Classroom

# Capstone - ASP.NET(MVC), React/Redux/Router, MySQL, HTML5, CSS3, JAVASCRIPT ES6, API, Entity Framework.
![Personal Notes App Logo](https://github.com/TECHCareers-by-Manpower/capstone-project-ss-h/blob/master/PersonalNotes/ClientApp/src/media/logo.png)
## Team name: SS&H coders
## List of Contributors:
* Shailza Sharma
* Shivani Jani
* Harpreet Kour
## Problem statement
How to remember the quick ideas/notes that comes in mind. Don't hassle to pick up notebook to make quick notes.
## Description
Create and store your notes for a later purpose. Notes can be activities and day to day tasks. Notes lets users make lists, quickly write down thoughts or any words/text that comes in mind that we may forget later. Users can manage everything from personal moments to any project tasks. Notes App will help users to keep track of tasks and deadlines.
## App installation and running instructions
### Clone the GitHub Repo
* Go to GitHub link "https://github.com/TECHCareers-by-Manpower/capstone-project-ss-h.git". Copy the link.
* Open Visual Studio 2019.
* Click on "Clone a Repository".
* Paste `https://github.com/TECHCareers-by-Manpower/capstone-project-ss-h.git` under Repository location.
* Choose Local path according to your choice in your system.
* Hit clone button at the bottom.

### Run following commands
 Open Package Manager Console and run following commands.
* `npm install`
* `npm install react-redux`
* `npm install react redux-react`
* `npm install react-router-dom`
* `npm install react-icons`
* `dotnet add package Microsoft.EntityFrameworkCore.Design`
* `dotnet add package Pomelo.EntityFrameworkCore.MySql`
* `dotnet add package Microsoft.EntityFrameworkCore.SqlServer`

### Database commands
* `dotnet ef database update`

### Run following command inside ClientApp
* `npm install axios`

### To view the project in your browser 
* Hit "F5 (or Press 'Fn/fn' button with F5)" to run the application. 

## Citation
* Home page design: "https://blog.hubspot.com/blog/tabid/6307/bid/34006/15-examples-of-brilliant-homepage-design.aspx".
* Horizontal line: "https://stackoverflow.com/questions/5214127/css-technique-for-a-horizontal-line-with-words-in-the-middle".
* HTML print: "https://stackoverflow.com/questions/12997123/print-specific-part-of-webpage".
* CopyToClipBoard method: "https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript".
* Format Date to proper date style (i.e.: 02/13/2020): "https://stackoverflow.com/a/58900382".
* Display success message: "https://stackoverflow.com/questions/51660947/parse-axios-alert-message-into-react-dom" 
* Display error message:"https://dev.to/cesareferrari/how-to-display-error-messages-in-a-react-application-3g48".
* HTML pattern attribute for non-number input fields: "https://webdesign.tutsplus.com/tutorials/html5-form-validation-with-the-pattern-attribute--cms-25145".
* Placeholder formatting: "https://stackoverflow.com/questions/38487394/how-to-set-the-color-and-font-style-of-placeholder-text/38487446".

## Project references 

* https://github.com/TECHCareers-by-Manpower/milestone-2-react-redux-project-osahd
* https://github.com/TECHCareers-by-Manpower/milestone-2-react-redux-project-sasa-titans
* https://github.com/TECHCareers-by-Manpower/4.1-ReactAPI
* https://github.com/TECHCareers-by-Manpower/4.1-MVC


## List of test cases
### Sign Up form test case:
* All fields must be entered.
* First and Last name cannot contain numbers (characters only). 
* Email should contain ‘@’ sign.
* Successful message after account is created.

### Sign In form test case:
* Blank fields on submit error: Email and Password must be entered!!
* Unregistered user on submit error: Invalid Sign In credentials. Please check your email or password.
* Successful Sign In will revert user to Read notes page.

### Read notes page test case:
* All records must be stored and retrieved from database once user logged in/logged out.
* Print note feature takes user to new tab to print a particular note.
* Share note feature copies the link to clipboard and can be opened in new tab.
* Edit note feature opens an edit form to edit a particular note and update in the database it as well.
* Delete note feature will delete a note. 

### Create note page test page:
* Description and date field must be entered.
* Successful message after creating a note.
* New note appears on Read note page and stores in database. 


## Trello Board
https://trello.com/b/AcsMU3jH/personal-notes-app

## Project details document link
https://drive.google.com/drive/folders/1IqaplGX6rGLfq3L9LeQaJ560xK6pYXY2?usp=sharing
