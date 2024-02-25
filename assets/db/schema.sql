--
-- Schema for the database
--

--
-- Main tables
--

DROP TABLE IF EXISTS 'picture';
DROP TABLE IF EXISTS 'container';
DROP TABLE IF EXISTS 'scene';
DROP TABLE IF EXISTS 'region';
DROP TABLE IF EXISTS 'sound';
DROP TABLE IF EXISTS 'setting';

-- pictures
-- format should be 'png' for sources
-- starting with 'data:picture/png;base64,'
-- other formats may be implemented later
CREATE TABLE 'picture' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'format' VARCHAR(20) NOT NULL,
    'source' VARCHAR(20) NOT NULL
);

-- containers
-- valid types are 'place' or 'folder'
CREATE TABLE 'container' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'type' VARCHAR(20) NOT NULL,
    'name' VARCHAR(20) NOT NULL,
    'description' VARCHAR(200) NOT NULL
);

-- scenes
CREATE TABLE 'scene' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' VARCHAR(20) NOT NULL,
    'description' VARCHAR(200) NOT NULL
);

-- regions
-- x and y positions refers to the center or origin of the shape
-- valid shape types are 'circle' or 'rectangle'
-- more shapes may be implemented
-- valid action types are:
-- 'sound', 'container', 'scene', 'back' or 'start'
-- action_id is siginificant for sound, container or scene actions
-- action_id is not implemented for back or start actions
-- but might be implemented later
CREATE TABLE 'region' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'scene_id' INTEGER NOT NULL,
    'position_x' INTEGER NOT NULL,
    'position_y' INTEGER NOT NULL,
    'shape_type' VARCHAR(20) NOT NULL,
    'shape_properties' JSONB NOT NULL,
    'action_type' VARCHAR(20) NOT NULL,
    'action_id' INTEGER NOT NULL,

    FOREIGN KEY ('scene_id') REFERENCES 'scene' ('id')
);

-- sounds
-- format should be 'mpeg' for sources
-- starting with 'data:audio/mpeg;base64,'
-- other formats might be implemented later
CREATE TABLE 'sound' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' VARCHAR(20) NOT NULL,
    'description' VARCHAR(200) NOT NULL,
    'format' VARCHAR(20) NOT NULL,
    'source' VARCHAR(20) NOT NULL
);

-- settings
CREATE TABLE 'setting' (
    'variable' VARCHAR(20) PRIMARY KEY,
    'value' VARCHAR(200) NOT NULL
);

--
-- Cross tables
--

DROP TABLE IF EXISTS 'picture_x_container';
DROP TABLE IF EXISTS 'picture_x_scene';
DROP TABLE IF EXISTS 'container_x_scene';
DROP TABLE IF EXISTS 'container_x_container';
DROP TABLE IF EXISTS 'startingpoint_container';
DROP TABLE IF EXISTS 'startingpoint_picture';

-- picture-container cross table
CREATE TABLE 'picture_x_container' (
    'picture_id' INTEGER,
    'container_id' INTEGER,

    PRIMARY KEY ('picture_id', 'container_id')
    FOREIGN KEY ('picture_id') REFERENCES 'picture' ('id'),
    FOREIGN KEY ('container_id') REFERENCES 'container' ('id')
);

-- picture-scene cross table
CREATE TABLE 'picture_x_scene' (
    'picture_id' INTEGER,
    'scene_id' INTEGER,

    PRIMARY KEY ('picture_id', 'scene_id'),
    FOREIGN KEY ('picture_id') REFERENCES 'picture' ('id'),
    FOREIGN KEY ('scene_id') REFERENCES 'scene' ('id')
);

-- container-scene cross table
CREATE TABLE 'container_x_scene' (
    'container_id' INTEGER,
    'scene_id' INTEGER,

    PRIMARY KEY ('container_id', 'scene_id'),
    FOREIGN KEY ('container_id') REFERENCES 'container' ('id'),
    FOREIGN KEY ('scene_id') REFERENCES 'scene' ('id')
);

-- container-container cross table
CREATE TABLE 'container_x_container' (
    'parent_id' INTEGER,
    'child_id' INTEGER,

    PRIMARY KEY ('parent_id', 'child_id'),
    FOREIGN KEY ('parent_id') REFERENCES 'parent' ('id'),
    FOREIGN KEY ('child_id') REFERENCES 'child' ('id')
);

-- startingpoint-container cross table
-- since there's only one starting point we only need this
CREATE TABLE 'startingpoint_container' (
    'container_id' INTEGER,

    FOREIGN KEY ('container_id') REFERENCES 'container' ('id')
);

-- startingpoint-picture cross table
-- this table should only have one row
-- since the starting point can only have one picture
CREATE TABLE 'startingpoint_picture' (
    'picture_id' INTEGER,

    FOREIGN KEY ('picture_id') REFERENCES 'picture' ('id')
);
