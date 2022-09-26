readme.md

IoT Dashboard for interfacing with embedded systems




…or create a new repository on the command line

git init

git add README.md

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/geolerme/your_repo.git

git push -u origin main




…or push an existing repository from the command line


git remote add origin https://github.com/guimagcm/your_repo.git

git branch -M main

git push -u origin main




...stage and commit

git add .

git commit -m "comments"

git push -u origin main



...Heroku deployment

$ heroku login

$ git add .
$ git commit -am "make it better"
$ git push heroku main


...Existing Git repository

For existing repositories, simply add the heroku remote

$ heroku git:remote -a dash-iot



