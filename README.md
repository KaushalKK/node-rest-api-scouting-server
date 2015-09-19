# Sequelize Test Repo

Code Repository to test development of a Node JS, Angular, Express application that will communicate with a MYSQL Database using Sequlize JS via a REST API interface.

#### POST Methods
##### Create Team
[x] POST /api/scouting/team
```
{
	"name": <STRING>,
	"number": <INTEGER>
}
```
##### Create Event
[x] POST /api/scouting/event
```
{
	"name": <STRING>,
	"week": <INTEGER>,
	"location": <STRING>,			// OPTIONAL
	"eventCode": <STRING>,
	"isDistrict": <BOOLEAN>
}
```
##### Create Match at Event
[x] POST /api/scouting/event/**Event Code**/match
```
{
	"dq": <BOOLEAN>,				// OPTIONAL (false if not specified)
	"teamNumber": <INTEGER>,
	"matchNumber": <INTEGER>,
	"autoPoints": <INTEGER>,		// OPTIONAL (0 if not specified)
	"telePoints": <INTEGER>,		// OPTIONAL (0 if not specified)
	"endgamePoints": <INTEGER>,		// OPTIONAL (0 if not specified)
	"totalPoints": <INTEGER>,		// OPTIONAL (0 if not specified)
	"penalties": <INTEGER>			// OPTIONAL (0 if not specified)
}
```
##### Register Teams for an Event
[x] POST /api/scouting/event/**Event Code**/teams
```
{
	"teams": <ARRAY>				// Array of Team #'s to associate with event
}
```
##### Create empty schedule of Matches for an Event
[x] POST /api/scouting/event/**Event Code**/schedule
```
{
	"totalMatches": <INTEGER>		// Array of Team #'s to associate with event
}
```
#### GET Methods
##### For Teams
##### Get Team Information
[x] GET /api/scouting/team/**Team Number**
##### Get all Events for a Team
[x] GET /api/scouting/team/**Team Number**/events
##### Get all Matches at Event for a Team
[x] GET /api/scouting/team/**Team Number**/**Event Code**/matches
##### For Events
##### Get Event Information
[x] GET /api/scouting/event/**Event Code**
##### Get all Teams attending an Event
[x] GET /api/scouting/event/**Event Code**/teams
##### Get all Awards for an Event
[ ] GET /api/scouting/event/**Event Code**/awards
##### Get all Matches at an Event
[x] GET /api/scouting/event/**Event Code**/matches
##### Get a specific Match at an Event
[ ] GET /api/scouting/event/**Event Code**/matches/**Match Number**