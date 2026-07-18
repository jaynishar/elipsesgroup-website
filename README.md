# Ellipsis Group - Premium Corporate Website & CRM System

This directory contains a complete, premium, responsive website for **Ellipsis Group** built using **React (Vite)** on the frontend and **Node.js (Express)** on the backend, complete with a full-fledged content administration dashboard (**CRM**).

---

## 🛠️ Technology Stack
1. **Frontend**: React (Vite) with Vanilla CSS (featuring glassmorphism, responsive grids, and animations).
2. **Icons**: Lucide React
3. **Backend API**: Node.js + Express
4. **Database**: Local JSON file (`database.json`) acting as a persistent local database for quick queries and updates.

---

## 🚀 How to Run the Project

### 1. Install Dependencies
Navigate to this directory in your terminal and install all required node modules:
```bash
npm install
```

### 2. Local Development Mode (Recommended for testing)
To run the project in development mode, start both the backend API and the frontend dev server:

* **Terminal 1: Start Backend API (Port 5000)**
  ```bash
  npm run backend
  ```
* **Terminal 2: Start Frontend Dev Server (Port 5173)**
  ```bash
  npm run dev
  ```

Open [http://localhost:5173](http://localhost:5173) in your browser. The frontend will communicate with the backend on port 5000.

### 3. Integrated Production Mode (Vite Build + Express Serve)
To compile the React bundle and serve both the static client-side pages and the CRM API on a single port:
```bash
npm start
```
Once built, open [http://localhost:5000](http://localhost:5000) in your browser. The Express server serves the compiled React app and the API endpoints directly.

---

## 📊 CRM Portal Features
The admin dashboard is accessible directly from the navigation bar under the **PORTAL CRM** button (or at the bottom copyright footer link).

1. **Dashboard Stats**: Displays live metrics for published blogs, portfolio projects, active divisions, and client inquiries.
2. **Blogs & Articles Manager**:
   - Create new articles with titles, custom image URLs, categories, short excerpts, and full markdown-ready body content.
   - Edit existing blogs.
   - Delete blogs.
3. **Portfolio Work Manager**:
   - Add new workspace projects with detailed metadata (Client name, Year, Location, Brand Division, description, and images).
   - Edit or delete portfolio projects.
4. **Company Services Manager**:
   - Update titles, subtitles, description copy, and key competency bullet points for **KEIYAN MEP**, **FRONTIER FURNITURE**, and **TOUCH WOOD** dynamically.
5. **Client Inquiries Feed**:
   - Displays incoming requests from the **Contact Us** forms in real time.
   - Organizes entries by category (General Inquiry, Collaboration, Careers/Jobs) with time-stamps.
   - Allows deletion of processed inquiries.

---

## 📂 Project Structure
* `database.json`: Active JSON storage for services, projects, blogs, and inquiries.
* `server.js`: Node/Express backend handling REST API endpoints.
* `index.html`: Site entry point with premium typography titles.
* `src/`
  * `index.css`: Typography scales, scrollbars, keyframe animations, and custom CSS design tokens.
  * `App.jsx`: State manager and client-side view router (fallback enabled).
  * `components/`: Navbar, Footer.
  * `pages/`:
    * `Home.jsx`: Dynamic homepage featuring animated stats, brand summaries, and portfolios.
    * `About.jsx`: Corporate backstory, operational values, mission, and vision.
    * `Services.jsx`: Tabbed view highlighting competencies.
    * `Work.jsx`: Filterable gallery of office designs.
    * `Blogs.jsx`: Article feed with dynamic overlay modals.
    * `Contact.jsx`: Classified inquiry forms communicating directly with the backend.
    * `AdminCRM.jsx`: Central content administrator console.
