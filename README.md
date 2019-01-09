# Event Planning Web Application

# SETUP

### To Install NPM, Node, Angular, MongoDB, Java and Selenium server
* In GroupProject directory

        chmod +x install.sh
        yes Y | ./install.sh

### To Run Application Locally
* Run MongoDB

        sudo service mongod start
        mongo --host 127.0.0.1:27017

* In new terminal, in GroupProject directory

        npm start

* Navigate to "localhost:3000" in web browser

### To Run Tests
* In new terminal, in GroupProject directory

        npm test

### To Seed database (useful to provide the database with example guests, events, admins etc...)
* Ensure MongoDB is running in another terminal (instructions above)
* In GroupProject directory

        npm run-script seed

# FEATURE TESTING

# Release 1

### To Seed database (useful to provide the database with example guests, events, admins etc...)
* Ensure MongoDB is running in another terminal (instructions above)
* In GroupProject directory

        npm run-script seed

### Story 1: I want to be able to login (change password/details/create account)
#### Instructions:
##### Part 1: Login
* When on the home screen, if you are not already logged in, there will be a button in the centre of the screen that says 'login'. There will also be a similar button in the navbar. If the screen is shrunk, a hamburger icon will appear on the navbar in the top right corner. On clicking this, the login button will appear in the dropdown menu.
* Click on either of these login buttons and you will be directed to the login page
* On the login page, there will be a 2 text input boxes and a login button.
* Enter your username in the box immediately below the word 'Username', and enter your password in the box immediately below the word 'Password'
* Once you have entered your details, click on the blue button that says 'Login'
* If you have entered the correct details, you will be directed to the dashboard. If you have entered incorrect details, you will remain on the login screen and be informed that your details are incorrect.

* For logging in for the first time, use credentials given below:

        Username: admin
        Password: admin

* IMPORTANT: Be sure to change this password once logged in, using the feature described below.
##### Part 2: Profile Edit
* Once you have logged in successfully. There is a 'Profile' button in the navigation bar at the top of the screen.
* Click the "Profile" button to be brought to the edit profile page.
* Here you can edit different aspects of your profile including name, email, username, and password.
* Once you have decided on any profile changes, click the 'submit' button, at the bottom of the page.


### Story 2: I want to be able to give admin access to other people
#### Instructions:
* We felt that it only made sense for you to be already logged in as an admin, before you could give admin access to a new account.
* Therefore, when you are logged in, there will be a button in the navbar labelled 'Register'. Click on this button and you will be directed to the register page.
* On this page, there are 5 input boxes and a button. Each input box will have text above it to tell you what each field is for.
* Fill in these fields as you wish. Ensure that the email field is the correct email format. Ensure that the password and confirm password fields have the same value typed into them.
* Once you have filled in these fields, click on the blue button with 'submit' on it.
* As long as all of the fields have been filled correctly, you will be navigated off this screen. Otherwise, you will be informed of your error and remain on this screen.
* Once you have successfully registered, these entered details can be used to log in.

### Story 8: I want to sent invitations to a mailing list, so that people know to come and that they are invited
#### Instructions:
* Once you have logged in, navigate to the "Send Mass Email" tab in the navbar.
* Choose the mailing list you would like to send to from the dropdown menu.
* Enter a subject body in the Subject Box.
* Enter your message in the Body Box. You can have the email address the recipients by name by placing <USERNAME> wherever you see fit.

### Story 9: Send out invitation(s)
#### Instructions:
* Same as above.
* There is the additional option of adding <EVENTDESCRIPTION> to the email text. This replaces the tag with the description of the event in the database.


### Story 4: I would like to be able to create an event e.g. a dinner
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On the Dashboard screen, below the 'Dashboard' title, there is a blue button with 'Add Event' on it. Click this button.
* On successfully clicking this button, you will be directed to the 'Add Event' page. This page is titled 'Add Event' and contains 8 input boxes that are all titled, and a button.
* The field titled 'Event Type' will contain an arrow on the far right that when clicked, will drop down a menu with options that upon clicked will fill this field.
* The fields titled 'Capacity', 'Seat Count' and 'Table Count' must contain a number (integer). They both have arrows at the right of the field to increment and decrement the entered number upon click.
* The field titled 'Date' will upon click, open a calendar, allowing you to select the date.
* Once you have filled in all of the fields, click on the blue button at the bottom labelled 'submit'
* If you have entered all the fields correctly, this event will be added to the database and you will be directed to the Dashboard screen. If not, you will remain on this screen and your error will appear at the top of the screen.

### Story 5: I want to be able to update event information and submit event updates
#### Instructions:
* If you have just created an event, there will be an event on the dashboard.
* Click the blue button at the bottom of this event.
* This will load the 'Add Event' page, with the details of the event pre-populating the form.
* Make any necessary changes in the form, following the guidelines for the form given in the previous story.
* Click the submit button at the bottom.

### Story 6: Keep track of possible/previous guests
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will first be met with a table listing all of the guests on the system, under the heading of 'All Guests'.

### Story 10: I want to see the invite list
#### Instructions
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will first be met with a table listing all of the guests on the system.
* If you scroll down, you will see the details of each event. Under these details is the invite list for this event.

### Story 11: I want to see guests contact details
#### Instructions:
* If you scroll down, you will see the details of each event. Under these details is the invite list for this event.
* In all of these tables, there are columns labelled 'Phone' and 'Email' which will contain the phone number and email address of the guests respectively.

### Story 12: I need to be able to manage  the responses so I can know who is attending
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page you will see tables of all guests and all events with their associated guests.
* To manage the response of a guest, they must first be present within an event table.
* If the guest is not already present within the event table in question, click the checkbox beside their name, then under the guest table select the event you wish to add them to from the dropdown box. When the event has been selected click 'Add Guest to Event'.
* Next scroll down the page until you see the event table you wish to manage responses for.
* To set the rsvp of a guest to true, click the checkbox in the guest in question's row and then click the 'RSVP Guest' button.

### Story 13: As staff, I need to register a guest for one event (including their details), so I can track what is needed for the event (dietary, ‰Û¡¡)
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will see tables of all guests and events with their associated guests.
* To add a new guest to the guest table, click the blue button labeled 'Add Guest'. This button will bring you to the register guest page.
* To register a guest from here, fill out all required fields. The email field must be an appropriate email. The Donation Total and Events Attended fields must be numbers.
* Once all required fields are filled, click the submit button. You will be brought back to the dashboard.
* The user you have just registered will now appear in the guest table.
* To add this guest to an event, click the checkbox beside their name, then under the guest table select the event you wish to add them to from the dropdown box. When the event has been selected click 'Add Guest to Event'.

### Story 22: I want to be able to see the rsvp list
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will first be met with a table listing all of the guests on the system.
* If you scroll down, you will see the details of each event. Under these details is the invite list for this event.
* In all of these tables specific to an event, there is a column titled 'RSVP'd' that will state whether the guest has RSVP'd or not.

# Release 2

### To Seed database (useful to provide the database with example guests, events, admins etc...)
* Ensure MongoDB is running in another terminal (instructions above)
* In GroupProject directory

        npm run-script seed

### Story 7: Track which guests are big spenders and/or regular donors (Administrator)
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will first be met with a table listing all of the guests on the system.
* All of these columns are sortable upon clicking the header for said column.
* To get the biggest spenders, click on the header "Donation Total" written in bold directly above the table. This will order the guests based of how much they have donated to the charity.
* An arrow will appear next to the header upon clicking. If the arrow is pointed upwards, the top guest in the table will be the guest who has the smallest donation total, and this total will increase as you move down the guests in the table.
* If the arrow is pointed downwards, the top guest in the table will be the guest who has the highest donation total, and this total will decrease as you move down the guests in the table.
* Click on the header to change the direction of the arrow and thus the order of the guests.
* To get the regular donors, click on the header "Events Attended" written in bold directly above the table. This will order the guests based on who are the most regular guests.
* The ordering works the same way as already mentioned for big spenders.



### Story 18: Online ticketing  - keeping in mind that mostly repeat customers/attendees (Administrator)
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* First, you must add a guest to an event (Story 13, described above, ensure this guest has a real email).
* Once a guest has been added to an event, you will see them in the list of guests under the event description on the dashboard page.
* Click the button 'Buy Tickets' on the guest you want to buy tickets for.
* This brings you to a page that shows the guest and event details, below is a form to fill for ticket details.
* Select an amount of tickets to buy from the dropdown (from 1 to 10).
* Enter table name.
* Enter dietary requirements (if any).
* Enter any extra comments (if any).
* There is a placeholder for payment processor information that would exist before the system goes live.
* Press submit button, you will be redirected back to the dashboard. An email of the tickets will be sent to the guest email address.

To view tickets for a guest for a given event:
* On the dashboard, scroll to the event and the guest you wish to look at.
* Click on the ticket count for the guest. This will direct you to a screen to view all the tickets.

### Story 29: I want to create menus (Administrator)
#### Instructions:
* Once you have logged in,  you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* Click the blue button named 'Manage event menus'.
* Now click the 'choose file' button. This will open your file browser. Select a pdf you wish to upload as a menu.
* Choose an event you wish to tie that menu to from the dropdown selector that reads 'Choose Event'.
* To upload the chosen pdf and tie it to the selected event, press the green 'Upload' button.
* There are two ways to view the pdf, one for the public and one for admins.
* For an attendee to view the event, navigate to the 'home' page through the navbar at the top of the page.
* Scroll to the event in question and click 'View event'. You will be brought to the event page. Then click 'View menu for <event>'. This will open a new browser window which will display the menu.
* For an admin to view the menu, navigate to the 'dashboard page' by clicking 'Dashboard' in the navbar.
* Scroll to the event in question and click 'View menu'. This will open a new browser window which will display the menu.

### Story 30: I want to see dietary requirements and access requirements of attendess so I can provide details to catering (Administrator)
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* Dietary requirements for every guest at every event will be visible under the "Dietary Requirements" column.


### Story 31: I want to be able to share special dietary requirements (including table info for guest) with the caterers so that they can make appropriate arrangements (Administrator)
#### Instructions:
* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* Scroll down to the event in question.
* Tick any guests whose dietary requirements you'd like to share (note only guests with dietary requirements will be sent to caterers)
* Enter the caterer's email address in the box beside the button labeled "Email Dietary Requirements to Caterers"
* Click on the button labeled "Email Dietary Requirements to Caterers". This will send a nicely-formatted email to the caterers containing the guests' table info and dietary requirements.


### Story 53: Have a tracker/ live count that updates with donations throughout the event (Administrator)
#### Instructions:
* For this feature to work, we needed to include an additional feature to add donations. Since this was an administration feature, we had it that the donations were being added on the administrator side.

* Once you have been logged in, you will be automatically brought to the dashboard page. Otherwise, there is a button in the navbar called 'Dashboard' that upon clicking on will bring you to the Dashboard page.
* On this page, you will first be met with a table listing all of the guests on the system.
* If you scroll down, you will see the details of each event. Under these details is the invite list for this event.
* To add a donation for a guest, first click the checkbox on the far right of the row for that guest.
* Secondly, navigate to the text box labelled 'Donation Amount' directly below the guestlist for the event. Fill this text box with donation amount, this must be a number value entered in.
* Thirdly, click on the grey button beside the text box labelled 'Add Donation'. Upon clicking this button, the donation amount you entered will be made for the guest you have selected.

* This donation will be added to the guest's donation total for the event and their overall donation total for the charity. This values can be seen updated respectively in the "Donation Total" and "Donation for Events" columns of this event guestlist table.  

### Story 54: I want to track current amount raised (Administrator)
#### Instructions:
* One does not have to be logged in to use this feature.
* Whether logged in or not, there will be a button in the navbar called 'Home' that upon clicking on will bring you to the Home page.
* On this page, you will be met with a list of the events.
* For each of these events, there will be a blue button labelled 'View Event'. Upon clicking on this button, you will be brought to a new screen.
* On this new screen, you will be presented with the event name and a live count of the amount raised so far for this event.
* This page will automatically update the Live Count figure as new donations are made. You can test this by adding a donation in another tab and watching the first tab as it gets live updated.
