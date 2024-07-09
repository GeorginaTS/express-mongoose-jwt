# EXPRESS - MONGOOSE - JWT API

A small API with a CRUD made with expressjs.

## Endpoints

GET "/" - list users

GET "/:id" - content user id

POST "/" - Create user (data validated with express-validator, password encrypted with bcrypt package)

PUT "/:id" - Update user (data validated with express-validator, password encrypted with bcrypt package)

DELETE "/:id" - Delete user

POST "/login"  - Login user (password decrypted with bcrypt package)

### AUTH PART (Middleware)

GET "/auth" - private user zone, verified with token
