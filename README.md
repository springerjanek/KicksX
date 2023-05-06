# KicksX

### Shoes market platform (https://stockx.com/ alike)

### LIVE SITE: https://famous-tiramisu-a4a400.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/f7fb3008-4307-487a-b979-a8961b4e537b/deploy-status)](https://app.netlify.com/sites/famous-tiramisu-a4a400/deploys)

https://user-images.githubusercontent.com/54078220/234381823-2343fafa-14a8-44b3-b53e-733c74ff65d7.mp4

---

## Setup

- /backend/.env <- INPUT YOUR POSTGRES DB INFO AND CREATE TABLE "shoes" AS IN `data.sql`

- /backend/firebase.json <- INPUT YOUR FIREBASE ADMIN SDK CONFIG INFO

- /frontend/src/firebase.js <- INPUT YOUR FIREBASE APP CONFIG INFO

- /frontend/serc.env <- INPUT YOUR BACKEND REQUEST URL

```bash
cd frontend
npm install
cd ..
cd backend
npm install
```

## Running

```bash
cd frontend
npm start
cd ..
cd backend
npm start
```

### Stack used:

<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />   
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
<img align="left" alt="TailwindCSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />    
<img align="left" alt="ReactQuery" width="30px" style="padding-right:10px;" src="https://vectorwiki.com/images/Skj0l__react-query-icon.svg" />
<img align="left" alt="Redux" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />    
<img  align="left" alt="Firebase" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" />
<img align="left" alt="Postgresql" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg"/>

<br />

---

TODO:

- tests
- main page
- refactor big components to smaller ones
- change and restyle ui

### FYI: this is my first time with backend and it's not optimized as it should, I just used it to make my project more useful ans usable
