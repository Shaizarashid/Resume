create Database SE;

use  SE

-- Creating the User table
CREATE TABLE [User] (
    UserName NVARCHAR(50) NOT NULL,
    ID INT NOT NULL,
    [Password] NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT UC_Email UNIQUE (Email)
);

-- Creating the Team table
CREATE TABLE Team (
    TeamID INT IDENTITY(1,1) PRIMARY KEY, -- Adding IDENTITY property for auto-increment
    LeaderName NVARCHAR(50) NOT NULL,
    EventName NVARCHAR(100) NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    CONSTRAINT UC_TeamID UNIQUE (TeamID),
    FOREIGN KEY (EventName) REFERENCES Events(EventName)
);

-- Drop the foreign key constraint in the TeamMembers table
ALTER TABLE TeamMembers
DROP CONSTRAINT FK_TeamMembers_Team;

-- Drop the existing primary key constraint in the Team table
ALTER TABLE Team
DROP CONSTRAINT UC_TeamID;

----------------------------------------------------------------------------------
-- Modify the TeamID column to add the IDENTITY property
ALTER TABLE Team
ALTER COLUMN TeamID INT IDENTITY(1,1);

-- Add the primary key constraint again
ALTER TABLE Team
ADD CONSTRAINT PK_Team_TeamID PRIMARY KEY (TeamID);
-----------------------------------------------------------------------------------

-- Add the foreign key constraint back to the TeamMembers table
ALTER TABLE TeamMembers
ADD CONSTRAINT FK_TeamMembers_Team FOREIGN KEY (TeamID) REFERENCES Team(TeamID);





CREATE TABLE TeamMembers (
    TeamMemberID INT PRIMARY KEY,
    TeamID INT,
    MemberName NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_TeamMembers_Team FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);



ALTER TABLE TeamMembers
DROP CONSTRAINT [PK__TeamMemb__C7C09285CCD6225E];


ALTER TABLE TeamMembers
DROP COLUMN TeamMemberID; -- Drop the existing TeamMemberID column

ALTER TABLE TeamMembers
ADD TeamMemberID INT IDENTITY(1,1) PRIMARY KEY; -- Add TeamMemberID as an identity column and set it as the primary key





ALTER TABLE Team
ADD CONSTRAINT FK_Team_Events FOREIGN KEY (EventName) REFERENCES Events(EventName);



-- Creating the Events table
CREATE TABLE Events (
    EventName NVARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2),
    MinTeamCount INT,
    MaxTeamCount INT,
    [Time] DATETIME,
    PRIMARY KEY (EventName),
    CONSTRAINT UC_EventName UNIQUE (EventName)
);

-- Altering the Events table to add a new column for MembersPerTeam
ALTER TABLE Events
ADD MembersPerTeam INT;


-- Creating the Feedback table
CREATE TABLE Feedback (
    EventName NVARCHAR(100) NOT NULL,
    StudentName NVARCHAR(50) NOT NULL,
    Rating INT,
    Comment TEXT,
    FOREIGN KEY (EventName) REFERENCES Events(EventName),
    PRIMARY KEY (EventName, StudentName)
);

-- Insert random users
INSERT INTO [User] (ID, UserName, [Password], Email, [Type])
VALUES (12, 'user1', 'password1', 'user1@example.com', 'Admin'),
       (23, 'user2', 'password2', 'user2@example.com', 'Student'),
       (24, 'user3', 'password3', 'user3@example.com', 'Sponser'),
       (44, 'user4', 'password4', 'user4@example.com', 'FacultyMentor');
-- Insert random events



-- Insert random feedback
INSERT INTO Feedback (EventName, StudentName, Rating, Comment)
VALUES ('Event 1', 'user1', 4, 'Great event!'),
       ('Event 1', 'user2', 5, 'Excellent organization'),
       ('Event 2', 'user3', 3, 'Could be better next time'),
       ('Event 2', 'user4', 5, 'Awesome experience');

   CREATE TABLE SponsorshipPackages (
    PackageID INT NOT NULL PRIMARY KEY,
    PackageName NVARCHAR(100) NOT NULL,
    Benefits NVARCHAR(MAX) NOT NULL,
    Cost DECIMAL(10, 2) NOT NULL
);
-- Inserting values into SponsorshipPackages table
INSERT INTO SponsorshipPackages (PackageID, PackageName, Benefits, Cost)
VALUES
    (1, 'Bronze Package', 'Logo placement, Mention in event materials', 500.00),
    (2, 'Silver Package', 'Logo placement, Social media mentions, Booth space', 1000.00),
    (3, 'Gold Package', 'Logo placement, VIP event access, Speaking opportunity', 1500.00);


drop table StudentExecutives

CREATE TABLE StudentExecutives (
    StudentID INT PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Position NVARCHAR(50) NOT NULL
);

ALTER TABLE Team
add TeamName nvarchar(100);

-- Inserting random values into StudentExecutives table

INSERT INTO StudentExecutives (StudentID, FullName, Category, Position)
VALUES
    (1, 'John Doe', 'Category 1', 'President'),
    (2, 'Jane Smith', 'Category 2', 'Vice President'),
    (3, 'Alice Johnson', 'Category 1', 'Secretary'),
    (4, 'Bob Brown', 'Category 3', 'Treasurer');

SET IDENTITY_INSERT StudentExecutives ON;
select * from [User]

select * from Feedback

select* from Events

delete from [Events] where Price = 2000;

select* from Team
DELETE FROM TeamMembers WHERE TeamID = 4;
DELETE FROM Team WHERE TeamID = 3;
select* from TeamMembers

select* from SponsorshipPackages

select * from StudentExecutives

select * from [User]
select * from [Events]

delete from [User] where id = 129;

select * from Events
select * from Feedback
select * from SponsorshipPackages
select * from StudentExecutives
select * from Team
select * from TeamMembers
select* from [User]

delete from Team

CREATE TABLE Sponsors (
    SponsorID INT PRIMARY KEY IDENTITY(1,1),
    SponsorName NVARCHAR(100) NOT NULL,
    SelectedPackage NVARCHAR(100) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE()
);

select* from Sponsors
