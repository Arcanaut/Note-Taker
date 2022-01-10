DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;
USE notes;

DROP TABLE IF EXISTS stickyNote;
DROP TABLE IF EXISTS newNote;

CREATE TABLE stickyNote (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  note_title VARCHAR(50) NOT NULL,
  note_body VARCHAR(250) NOT NULL,
   description TEXT,
);

CREATE TABLE newNote [AS] SELECT * FROM stickyNote;

Select * Into newNote From stickyNote Where 1 = 2



INSERT INTO stickyNote (title, description)
VALUES
  ('title', 'Description'),


  SELECT * FROM stickyNote;
  SELECT note_title, description FROM notes;
