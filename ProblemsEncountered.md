# alx-project-nexus
## Project Overview
This repository is for my ALX PROJECT NEXUS in which I will try to implement what I have learned for the last 4 months.

### Problems Encountered in Setting the Project
First probelem I ran into was with installing tailwindcss. 
```
The error npm error could not determine executable to run when running npx tailwindcss init -p was caused by:

Missing CLI package: Tailwind CSS v4 requires a separate @tailwindcss/cli package
Changed initialization approach: Tailwind CSS v4 no longer supports the init command
```
To solve the problem I had to check an LLM.
Changes Made to solve it: 
```
1. Added the following packages to devDependencies:

"@tailwindcss/cli": "^4.1.17",
"@tailwindcss/vite": "^4.1.17"

2. Vite Configuration
Updated 
vite.config.ts
 to include the Tailwind CSS Vite plugin:

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react(), tailwindcss()],
}) 

3. CSS Import
Added Tailwind CSS import to 
index.css
:

@import "tailwindcss";
```

## Step 2 Installing Redux Toolkit
Setting up Redux Toolkit to handle the application's state, especially the list of products, the active filters, and the sorting criteria.
==> Redux Toolkit (RTK) is the modern, recommended way to write Redux logic, as it simplifies common tasks and enforces best practices.
1. npm install @reduxjs/toolkit react-redux