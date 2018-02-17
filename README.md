# Skill-Set

CREATE TABLE mstSkills (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL,
status BIT
);


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
