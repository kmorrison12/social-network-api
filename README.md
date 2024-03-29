# Social Network API

## User Story
AS A social media startup\
I WANT an API for my social network that uses a NoSQL database\
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria
GIVEN a social network API\
WHEN I enter the command to invoke the application\
THEN my server is started and the Mongoose models are synced to the MongoDB database\
WHEN I open API GET routes in Insomnia for users and thoughts\
THEN the data for each of these routes is displayed in a formatted JSON\
WHEN I test API POST, PUT, and DELETE routes in Insomnia\
THEN I am able to successfully create, update, and delete users and thoughts in my database\
WHEN I test API POST and DELETE routes in Insomnia\
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list\

Video Walkthrough\
User Routes: https://drive.google.com/file/d/1BsPc-swn7Ybyq5sMQhJ7Nq1xZCzWk6Tc/view

Thought Routes: https://drive.google.com/file/d/162OUQGJzk3q69NKeE0USyLA7fUQpPXZG/view

Assistance provided by AskBCS for addFriend and getThoughts functions in controllers.
