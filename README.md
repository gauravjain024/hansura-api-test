# hansura-api-test

##Pull Docker Images

```bash
docker pull postgis/postgis
docker pull hasura/graphql-engine
```

##setup database

Table1: user
id: Integer, Primarykey Auto Increment
first_name, Text
last_name, Text
gender,Text

Table2: user_tracking:
user_id: Integer
lat Decimal
lng: Decimal



##Create a Function for location tracing

```sql
CREATE
OR REPLACE FUNCTION public.findusers(
  lat1 double precision,
  long1 double precision,
  bound integer
) RETURNS SETOF user_tracking LANGUAGE sql STABLE AS $ function $
SELECT
  id,
  user_id,
  long,
  lat
FROM
  user_tracking as a
WHERE
  ST_DWITHIN(
    ST_SetSRID(ST_Point(a.long, a.lat), 4326),
    ST_TRANSFORM(ST_SetSRID(ST_Point(long1, lat1), 4326), 3857),
    bound
  );$ function $
```
  
##Install Packages

```bash
npm install
#Run Docker Image
docker-compose up
#Run The server
npm run start
```


##call the endpoints

POST: localhost:3000/auth/login
{
	"username": "admin",
	"password": "admin"
}

POST: http://localhost:3000/users/list
Headers:
Authorization: "Bearer ey....."


POST: http://localhost:3000/users/find
Headers:
Authorization: "Bearer ey....."
