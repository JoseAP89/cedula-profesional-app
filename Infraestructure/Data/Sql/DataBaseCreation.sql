CREATE TABLE Participant(
	ParticipantId INTEGER PRIMARY KEY AUTOINCREMENT,
	CompanyName varchar(250),
	Cedula varchar(250),
	Name varchar(250),
	Title varchar(250),
	Email varchar(250),
	Phone varchar(10),
	UNIQUE(CompanyName)
);