
# ESGI HACKATHON 2023 - Team n°14

This repository contains the resources and source code developed during the ESGI 2023 Hackathon, organised by the Carbon IT company. 
The aim of this hackathon was to find solutions to centralise, gamify and better support their employees.




![App Screenshot](https://i.postimg.cc/B6JSHyvk/Capture-d-e-cran-2023-06-11-a-17-16-01.png)




## Authors

Developers :
- [@Milan Camus](https://github.com/MisterGoodDeal)
- [@Sylvain Boudacher](https://github.com/SylvainBoudacher)
- [@Romain Pierucci](https://github.com/Norudah)
- [@Amin Nairi](https://github.com/aminnairi) (Trainee for 1 hour)

Marketing :
- [@Lea Lemaitre](https://www.linkedin.com/in/l%C3%A9a-lemaitre-chef-de-projets-marketing-operationnel)
- [Thomas Roche](https://www.linkedin.com/in/thomas-r-8a3526179/)

## Tech Stack

**Front:** Next.js, TanStack React Query v3, NextUI, Recoil, React-dnd, react-framer-motion, zod, react-hook

**Back:** Nest.js, zod

**DB:** SQL, Prisma.js ORM



## Installation

Install my-project with npm

```bash

  make turboinstall
  
  

  
  
```

```bash
  npm install

  npm run dev

  npm run build
  npm run start
```
    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## ⚠️ Recurring problems in the project ⚠️

 1. The front-end can sometimes stop receiving information from the back-end.

Temporary solution: 
```
Restart the back-end docker
```

2. During the first connection, the back-end is unable to receive its user and therefore cannot check certain information.

Temporary solution: 
```
Refresh your browser
```

3. Seeds for the "Project" section may bug on Apple M1/M2 chipsets



## List of features

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
