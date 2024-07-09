# EXPRESS - MONGOOSE - JWT API


A small API with a CRUD made with expressjs.

## Endpoints.
GET "/" - list users

GET "/:id" - content user id

POST "/" - Create user (data validated with express-validator)

PUT "/:id" - Update user (data validated with express-validator)

DELETE "/:id" - Delete user

POST "/login"  - Login user

### AUTH PART (Middleware)

GET "/auth" - private user zone, verified with token