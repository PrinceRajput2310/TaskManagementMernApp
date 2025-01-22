                                  Task Management:- App
                     Tech Stack Used:-   React Js, Node Js, Express Js, MongoDB, JavaScript, Redux, Redux-saga, Bootstrap, HTML/CSS

                 1. User Can Create Account
                 2. User Can update Account,
                 3. Login/Signup
                 4. Create Task, Search Task, Update task, Delete Task
                 5. Admin Dashboard
                 6. Task Analytics screeen where user can see the number of user registerd , and he will also see the total task created on the platform,also he will see his task completion status, he will also see where he rely on task completion category
                 7. Feed management:- here user can create post with description and image. also he will be able to see all users post


To setUp this project in your local machine
1 . clone this repository 
2. go to server file and run npm install  and npm run dev to start the server
3. for frontend , go to taskapp file and run npm install and then npm start
4.create .env file inside server file 
paste this environment variable

PORT=3005
MongodbURL =
JWT_SECRET=
JWT_EXPIRE=1d
COOKIE_EXPIRE=5
NODE_ENV="production"

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


after this create account on MongoDB atlas and cloudinary and paste their value accordingly 