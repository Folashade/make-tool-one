__ BRANCH: SLIDER - TICKS __

Version of app presented in class.Has the updated task titles and color scheme.

 + Tabs Open
	- Make Tool
	- Server 
	- Heroku Logs
	- Local PSQL
	- PSQL Heroku DB
	- Local Tunnel
	
 + Connect to DB Local
	- load dump file: pg_restore --verbose --clean --no-acl --no-owner -U 'FOkunubi' -d cobalt latest.dump
	- open postgres: psql
	- used database: \c cobalt

 + Connect to DB remote
	- psql "dbname=d2d1mma7140cav host=ec2-54-225-102-116.compute-1.amazonaws.com user=mpeyvkpeoywcaj password=mQB_kCBkTaZCP-ct0OhCNl3zBO port=5432 sslmode=require"
	-- ex manipulation: CREATE TABLE surveys (
							     title varchar(100),
							     employee integer,
							     content varchar(500)
							 );
    -- 						INSERT INTO surveys VALUES
							d2d1mma7140cav->     ('FirstName LastName', 1, ' This is an example sentence. 			
							{(JSON:OBject)} ');
							
	
####  Tadpoll 
- psql "dbname=d2d1mma7140cav host=ec2-54-225-102-116.compute-1.amazonaws.com user=mpeyvkpeoywcaj password=mQB_kCBkTaZCP-ct0OhCNl3zBO port=5432 sslmode=require"


## Process
+ 

## Resources
+ [Node](node.js)

## Questions
+ How to start...? 
  - npm install express
+ anonymous function from recitation 

## Problems
+ EEBAE
  - sold
  - should i be getting the parent element
  - on refresh it's doing somehting else 


get request that calls app request
compute the answer
-
return query and slice math
--


## --------------------------------------------

https://devcenter.heroku.com/articles/getting-started-with-nodejs



Your app, foo-eebae, has been created.
App URL:
http://foo-eebae.herokuapp.com/
Git URL:
git@heroku.com:foo-eebae.git  
Use the following code to set up your app for local development:

git clone git@heroku.com:foo-eebae.git -o heroku



## --------------------------------------------

heroku addons:add heroku-postgresql
Added heroku-postgresql:dev to peaceful-tor-4099 (Free). Attached as HEROKU_POSTGRESQL_COBALT_URL Database has been created and is available ! This database is empty. If upgrading, you can transfer ! data from another database with pgbackups:restore.

## --------------------------------------------
heroku addons:add pgbackups


--- the file was saved to latest.dump inthe current dir
- psql dbname < infile  
		= psql cobalt < latest.dump
		
		pg_restore --verbose --clean --no-acl --no-owner -h myhost -U myuser -d mydb latest.dump
		pg_restore --verbose --clean --no-acl --no-owner -h myhost -U 'FOkunubi' -d cobalt latest.dump
				pg_restore --verbose --clean --no-acl --no-owner -U 'FOkunubi' -d cobalt latest.dump
				
				
				
## --------------------------------------------
				
https://github.com/brianc/node-postgres/wiki/pg


## --------------------------------------------

http://stackoverflow.com/questions/10632801/how-to-find-the-url-path-to-a-local-postgres-database
postgres URL
postgres://username:password@host/database
postgres://'FOkunubi':'folashad3'@localhost/cobalt

## --------------------------------------------
https://devcenter.heroku.com/articles/heroku-postgresql


heroku pg:promote HEROKU_POSTGRESQL_COBALT_URL
