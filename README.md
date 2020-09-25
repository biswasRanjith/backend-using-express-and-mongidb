## intugine


##Install all the dependencies.

npm i

# create .env file
add DB_STRING
add ACCESS_TOKEN_SECRET
add REFRESH_TOKEN_SECRET


# Start the project.

npm run devStart

# To test Apis register and login user every time server starts

# Register

eg:
POST
http://localhost:5000/registerUsers /registerUsers

#sample data in body
{ 
"name" : "Ranjith Biswas",
"email" : "biswasranjith",
"password" : "12345678"
}

# Login
eg:
POST
http://localhost:5000/login

# sample data in body
{ 
"email" : "biswasranjith",
"password" : "12345678"
}

returns accessToken and refreshToken
copy accessToken


# To refresh token
POST
http://localhost:5000/token

#sample data in body
{ 
 "token": "<REFERESH-TOKEN>
}

# To get devices 

eg:
GET
http://localhost:5000/devices

Headers
Content-Type = application/json
Authorization = Bearer <ACCESS-TOKEN>

# To get devices with locations

eg:
GET
http:http://localhost:5000//deviceslocs/:deviceId?page=

Headers
Content-Type = application/json
Authorization = Bearer <ACCESS-TOKEN>

add deviceId and page in params 







