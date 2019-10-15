# node-api

Take pull from the master branch

---
**1.** Install Node modules

**2.** Add a .env file

**3.** in .env file make two variable
>
**3.1** MONGODB_URL=contain your mongodb magnet url
>
**3.2** SECRET=contain your app secret
>
**3.3** CLIENT_URL=contain frontend server url

**4** Run -> npm start

##Api Routes
1. /users/register (post) | require 3 parameters | name, email, password

2. /users/login (post) | require 2 parameters | email, password

3. /users (get) | require authorization header jwt