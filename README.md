RUN THE TESTING :
COMMAND=test docker-compose up --build

START THE CONTAINER :
COMMAND=start docker-compose up --build

API AUTHENTICATION WITH BEARER TOKEN :
POST /user/register, ARGS: email (required)


LIST OF API :

- GET /admin/urls
Get all of urls

- GET /admin/urls/{slug}
Get specific url

- POST /admin/urls, ARGS: original (required), slug
Register an url to get shortened slug, or register with custom slug

- PUT /admin/urls/{slug}, ARGS: original (required)
Update the original url given the slug

- DELETE /admin/urls/{slug}
Delete a registered url

- GET /admin/user
Get the list of registered users

- GET /admin/visitor
Get the list of visitors


POSTMAN LINK
https://red-trinity-662156.postman.co/workspace/My-Workspace~d5e60671-7a06-4bca-8a19-5e3e6125ee96/collection/1669089-d36c9f5a-f8b4-49a3-bf3e-34dcaa2b6b22?action=share&creator=1669089