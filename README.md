# LearningApp
CSE550 Team Project - Spring 2024
## Install VS Code with Git credentials added

## Install Node.JS and Angular

## Configure your name to be able to send update messages by typing these in or work with Git in the VS Code
```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```
## Get your Git Started
In your command prompt after installation. Know where you want to clone the repository and type in this:
```
$ git clone https://github.com/JesseDalewalker/LearningApp.git
```
Another way and may be easier, to to select the "<> CODE" tab and either clone from copying or from opening with VS Code.

## Git Workflow
### **Important note:** Make sure you are committing your changes on your own branch before merging onto the main branch!
1. Ensure you're in the main branch by checking with: `$ git branch -a`
2. Pull from the main branch with this command to get the most up to date version (unless you had just cloned the repo): `$ git pull origin main`
3. Create a new branch and name it after the feature you will be working on. Running the following command will switch you to the branch after specifying the name.
```
$ git checkout -b <new-branch>
```
```
## VS CODE
Click on "Git" --> "New Branch"
```

#### (Example: landing page -> `$ git checkout -b landing`)
4. Start coding!
5. Run commit commands to **your** branch (In VS Code: click "git"-->"Commit or Stash.."--> Select files to "Stage" by selecting the "+" icon on the right of file. Add the message and commit)
```
$ git add .
$ git commit -m "Your message here"
$ git push origin <branch-name>
```
6. To avoid running into conflicts when creating a pull request, checkout into the local main branch and merge it with your custom branch:
```
$ git checkout main
$ git merge <branch-name>
```
7. Submit a pull request. GitHub will notify you if there are any conflicts you need to resolve within the files before being able to merge the changes.
- If there are any issues, run `$ git status` to pinpoint their location.
