# Highway-Delite

![GitHub repo size](https://img.shields.io/github/repo-size/saksham-pahadi/WEB-PROJECTS?logo=github)
![GitHub license](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-v16%2B-blue?logo=node.js)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?logo=github)

Highway-Delite is a web project built to explore and practice modern web development concepts.  
This README will guide you through setup, building, running, and contributing.

---

## 📌 Prerequisites

Make sure you’ve got these installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (comes with Node.js) or yarn/pnpm
- Git

---

## ⚙️ Setup

Clone the repository and jump into the project folder:

```bash
git clone https://github.com/saksham-pahadi/WEB-PROJECTS.git
cd WEB-PROJECTS/highway-delite

```

### Step-2 : Install dependencies

```bash
npm install
```
 (or use yarn install / pnpm install if you prefer)
### Step-3 : Set Environment Variables
```bash
MONGODB_URI="your mongoDB connection string"
JWT_SECRET="your random secret string"
NEXT_PUBLIC_URL="your domain or localhost"
NEXTAUTH_SECRET="random secret string"
GOOGLE_CLIENT_ID="Your Google client ID"
GOOGLE_CLIENT_SECRET="Your Google client SECRET"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER="Your gmail ID"
SMTP_PASS="Your App password"
```
### Step-4 : 🛠️ Build - To build the project for production:
```bash
npm run build
```
### Step-5 : ▶️ Run - 
- Start the development server
```bash
npm start
```
- The project will be available at:
```bash
http://localhost:3000
```
(or whichever port your setup uses)