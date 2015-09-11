# Sequelize Test Repo

Code Repository to test development of a Node JS, Angular, Express application that will communicate with a MYSQL Database using Sequlize JS via a REST API interface.

#### POST Methods
/api/scouting/team
```
{
	"name": <STRING>,
	"number": <INTEGER>
}
```

/api/scouting/event
```
{
	"name": <STRING>,
	"week": <INTEGER>,
	"location": <STRING>,			// OPTIONAL
	"eventCode": <STRING>,
	"isDistrict": <BOOLEAN>
}
```

/api/scouting/event/:eventCode/match
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