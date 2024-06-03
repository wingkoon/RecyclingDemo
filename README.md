# Recycling Made Simple
by Kevin, Wing Koon Leung

Recycling Made Simple is a Matchmaking Web App to match between recycle service user and recycle service provider.
The matchmaking is basically a three-step process.
Steps:
1. The user notify he wants to [post waste]. Immediately he will be matchmake with the service provider with the compatible service scope (Here it is location (town) and waste type). Then the user will confirm if he wants to use the service.
2. The service provider has the [matchmaking result] shown to him. He can choose to give service. Once he click the button and give service, he has to set the schedule of pick up. That means the service provider agree to give the pick up service at the said schedule. 
3. The user can find out the confirmed [matchmaking result] and has the resulting provider information and the pick up schedule.

To make the app easy to use, this #app uses a lot of dropping menu so save user from typing.

# How to Run
1. Load the database
go to the terminal
cd backend/db/schema
startpostgres

psql
\connect recycle
\i create.sql
\i development.sql
\q

2. It requires backend and frontend. So open two terminal.
backend:
cd backend
npm start

frontend:
cd frontend
npm start



