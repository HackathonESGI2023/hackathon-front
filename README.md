
# ESGI HACKATHON 2023 - Team n°14

This repository contains the resources and source code developed during the ESGI 2023 Hackathon, organised by the Carbon IT company. 
The aim of this hackathon was to find solutions to centralise, gamify and better support their employees.




![App Screenshot](https://i.postimg.cc/B6JSHyvk/Capture-d-e-cran-2023-06-11-a-17-16-01.png)




## 1 - Authors

Developers :
- [@Milan Camus](https://github.com/MisterGoodDeal)
- [@Sylvain Boudacher](https://github.com/SylvainBoudacher)
- [@Romain Pierucci](https://github.com/Norudah)
- [@Amin Nairi](https://github.com/aminnairi) (Trainee for 1 hour)

Marketing :
- [@Lea Lemaitre](https://www.linkedin.com/in/l%C3%A9a-lemaitre-chef-de-projets-marketing-operationnel)
- [Thomas Roche](https://www.linkedin.com/in/thomas-r-8a3526179/)

## 2 - Tech Stack

**Front:** Next.js, TanStack React Query v3, NextUI, Recoil, React-dnd, react-framer-motion, zod, react-hook

**Back:** Nest.js, zod

**DB:** SQL, Prisma.js ORM



## 3 - Installation

The stack is separated in 2 folders :
- /hackaton-frontend : The web app in Next.js
- /hackaton-backend : The server in Nest.js

### 3.1 - Setup backend

1. Go to /hackaton-backend

2. Copy paste the .env with the following entries :

```bash
DATABASE_URL="postgresql://admin:admin@db:5432/db?schema=public"
JWT_SECRET="tartipouet"
IMGUR_SECRET="b5257d3397e60ef73d7b06240564d1492d4b0e81"
SLACK_CLIENT_SECRET="xoxb-5365967909319-5377622002213-WvMFBXkw7YUZOnwrayK6CL3I"
APP_NAME="BRIGDE by Carbon"
```

You can use this makefile command to run all the commands at once :

```bash
  make turboinstall  
```

or use the following commands :

3. Run the project with docker

  
```bash
  make build
  make up
```
  
 


4. Generate the database

```bash
  make migrate
  make generate
```

5. Execute the seeds

```bash
  make seed
```

6. Fix bcrypt

```bash
  make fix-bcrypt
```



### 3.1 - Setup frontend

1. Go to /hackaton-front
2. Verify that you have node 19. installed locally on your machine

3. Install the dependencies

```bash
  npm i
```

4. Build the app

```bash
  npm run build
```

5. Run the app

```bash
  npm run start
```

## 4 - Roles

| Email                  | Password | Role       |
| ---------------------- | -------- | ---------- |
| consultant@example.com | @Test123 | CONSULTANT |
| support@example.com    | @Test123 | SUPPORT    |


## ⚠️ 5 - Recurring problems in the project ⚠️

1. The front-end can sometimes stop receiving information from the back-end.

Temporary solution: 

```txt
Restart the back-end docker
```

2. Seeds for the "Project" section may bug on Apple M1/M2 chipsets

## 6 - List of features

Any additional information goes here

| Feature                        | Author  |
|--------------------------------|---------|
| Login                          | Sylvain |
| Recoil atom token and user     | Milan   |
| Apply and Sponsorship          | Milan   |
| KPI Cards Occupancy components | Sylvain |
| KPI Cards simple component     | Romain  |
| Events component               | Milan   |
| Missions component             | Milan   |
| Shortcut component             | Sylvain |
| CRUD Contract                  | Milan   |
| CRUD Missions                  | Milan   |
| Profiles search page           | Sylvain |
| Add users modal                | Milan   |
| CRUD formation                 | Milan   |
| CRUD Worshop                   | Milan   |
| Slack integration              | Milan   |
| Header component               | Sylvain |
| User skill component           | Romain  |
| Drag and drop component        | Romain  |
| Dashboard Support              | Sylvain |
| Dashboard Consultant           | Romain  |
| Front API route                | Amin    |
