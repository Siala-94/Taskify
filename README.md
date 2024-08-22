# TDDD27_2024_task_manager

This project aims to build a task managing tool that aims to make collaborative and individual tracking of tasks easier.

To achieve this, some functionality goals are outlined, that the project aims to implement.

## Project screen cast

https://youtu.be/l7PCmMPY5Gs

## coding screen cast

https://www.youtube.com/watch?v=PnQWxIfmj-s

## functionality

- Registering user using firebase auth, email and password
- signing in using firebase auth, email and password
- inbox, today and upcoming views where users can add tasks to inbox and switch to other projects (capture page)
- see upcoming and daily deadlines of tasks
- adding tasks
  - add tasks within tasks
  - set due date
  - possibility to post comments under tasks
  - adding priority levels
  - switch task between comments
- creating projects
  - create project within project (nested projects)
  - invite team members to projects
- other

## future functionality

- sign in using google
- nlp functionality to describe what you want to do in task description
- add filters
- grouping tasks by a category
- filtering tasks by a category
- adding sections to tasks
- connect to google calendar

## Technical stack

The following stack is used to develop the projects

- MongoDB: document based database for storing necessary database
- Express.js and node.js for server side development
- React for client side development
- Tailwind css, for handling styling
- DaisyUI, component library on top of tailwind
