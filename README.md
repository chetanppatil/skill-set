# Skill-Set

Add Skill, Get Skills, Update Skill/Status

### Introduction
Provides functionality to perform skill operations.

Database used: **MySQL**

Follow below steps to run this project on any enviroment:
- Clone this repository in your system with following command
  ```shell
  git clone https://github.com/Chetan07j/skill-set.git
  ```
- All dependencies are added in **package.json** , install it with following command
  ```shell
  npm install
  ```
- Open **db.json** file from config folder & update user and password with your MySQL credentials.
- After all configuration run your application with following command
  ```shell
  npm run
  ```
- Create database **skill-set** with following command
  ```sql
  CREATE DATABASE skill-set;
  ```
- Select created DB and execute following statement to create required table
  ```sql
  CREATE TABLE mstSkills (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    status BIT
  );
  ```
- Execute following script to create addSkill function
  ```sql
  CREATE drop FUNCTION addSkill ( skillName varchar(30), skillStatus BIT )
  RETURNS varchar(20)
  BEGIN
     DECLARE varOut varchar(20);
     IF (SELECT EXISTS(SELECT id from mstSkills WHERE LOWER(name) = LOWER(skillName))) THEN
        SET varOut = 'alreadyExists';
     ELSE
     	  INSERT INTO mstSkills(name, status) VALUES(skillName, skillStatus);
        SET varOut = 'inserted';
     END IF;
     RETURN varOut;
  END;
  ```
- Execute following script to create updateSkill function
  ```sql
  CREATE FUNCTION updateSkill(skillId INT, skillName VARCHAR(30), skillStatus TINYINT, cmdType VARCHAR(20))
  RETURNS varchar(20)
  BEGIN
     DECLARE varOut varchar(20);
     IF (SELECT EXISTS(SELECT id from mstSkills WHERE id = skillId)) THEN
     	  IF (cmdType = 'skill') THEN
     	  	UPDATE mstSkills
     	  	SET name = skillName
     	  	WHERE id = skillId;
  	  ELSE
  	  	UPDATE mstSkills
     	  	SET status = skillStatus
     	  	WHERE id = skillId;
  	  END IF;
        SET varOut = 'updated';
     ELSE
        SET varOut = 'skillNotExists';
     END IF;
     RETURN varOut;
  END;
  ```

### API Details
List & cURL of APIs is as following:

- **ping** (To check application is running or not)
  ```shell
  curl -X GET http://localhost:3000/skill-set/api/ping
  ```
- **Add Skill**
  ```shell
  curl -X POST \
  http://localhost:3000/skill-set/api/skills \
  -H 'content-type: application/json' \
  -d '{
  	"name": "My Skill",
  	"status": 1
  }'
  ```
- **Get Skills** (Skill Search)
  ```shell
  curl -X GET http://localhost:3000/skill-set/api/skills
  ```
- **Edit Skill** `1 in this cURL refers to skill id`
  ```shell
  curl -X PUT \
  http://localhost:3000/skill-set/api/skills/1/update \
  -H 'content-type: application/json' \
  -d '{
  	"name": "New Name"
  }'
  ```
- **Change Status** `1 in this cURL refers to skill id`
  ```shell
  curl -X PUT \
  http://localhost:3000/skill-set/api/skills/1/approve \
  -H 'content-type: application/json' \
  -d '{
  	"status": 1
  }'
  ```
