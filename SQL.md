# SQL commands
## Table and associations
- Database: Hoyts
- Tables: `Movies`, `Reviews`, `Genres`, `Movies_Genres` (join table)
- Associations: 
  - `Movies` one-to-many `Reviews` 
  - `Movies` many-to-many `Genres`
  - `Genres` one-to-many `Reviews` through `Movies`

## 1. Setup
Create database
```bash
# run postgresql in terminal
psql
# create database
CREATE DATABASE hoyts_movies;
# connect to database
\c hoyts_movies

# other useful terminal commands
\c {database_name}# connect to [database] 
\l # list all databases
\dt #list all tables in current database
\d {table_name} #list schema of table
```
Create tables
```sql
CREATE TABLE Movies (
  id serial PRIMARY KEY,
  title varchar(255),
  duration int
);

CREATE TABLE Reviews (
  id serial PRIMARY KEY,
  movie_id int REFERENCES movies,
  description varchar(255),
  rating int
);

CREATE TABLE Genres (
  id serial PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE Genres_Movies (
  movie_id int REFERENCES movies,
  genre_id int REFERENCES genres
);
```
## 2. Seed database
Seed movies
```sql
-- DELETE EXISTING DATA
DELETE FROM Movies;
-- REST SERIAL PRIMARY KEY
ALTER SEQUENCE movies_id_seq RESTART WITH 1;
-- SEED NEW DATA
INSERT INTO Movies (id, title, duration) VALUES
(1, 'Alien', 120),
(2, 'Alien 2', 140),
(3, 'Jaws', 100),
(4, 'The Hobbit', 300),
(5, 'Gravity', 60);
-- LIST ALL MOVIES
SELECT * FROM Movies;
```
Seed reviews for movies
```sql
-- DELETE EXISTING DATA
DELETE FROM Reviews;
-- REST SERIAL PRIMARY KEY
ALTER SEQUENCE reviews_id_seq RESTART WITH 1;
-- SEED NEW DATA
INSERT INTO Reviews (movie_id, description, rating) VALUES
(5, 'So short and sweet', 10),
(3, 'I love sharks', 10),
(3, 'Sharks scare me', 1),
(1, 'Aliens are so scary', 5);
-- LIST ALL MOVIES
SELECT * FROM Reviews;
```
Seed genres
```sql
-- DELETE EXISTING DATA
DELETE FROM Genres;
-- REST SERIAL PRIMARY KEY
ALTER SEQUENCE genres_id_seq RESTART WITH 1;
-- SEED NEW DATA
INSERT INTO Genres (name) VALUES
('Drama'),
('Action'),
('Comedy'),
('Horror');
-- LIST ALL MOVIES
SELECT * FROM Genres;
```

<!-- TODO -->
<!-- MAKE ASSOCIATIONS -->
<!-- MAKE JOIN QUERIES -->