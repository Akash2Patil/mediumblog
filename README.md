# MediumBlog 🚀  

A **Medium-inspired blogging platform** built with **React, TailwindCSS, Cloudflare Workers, Prisma, and PostgreSQL**.  
The project is structured into three main parts: `backend`, `common`, and `frontend` (shared types/validation).  

---

## ✨ Features  

- 🔑 User authentication with **JWT**  
- 📝 Blog CRUD operations (create, update, delete)  
- 🗄️ Database management using **Prisma & PostgreSQL**  
- 🎨 Frontend built with **React + TailwindCSS**  
- ☁️ Backend deployed on **Cloudflare Workers** for scalability and speed  
- ✅ Zod validation for type-safe inputs  

---

## 📂 Project Structure

mediumblog/
│── backend/ # Backend APIs (Cloudflare Workers + Prisma)
│── common/ # Shared types and Zod validations
│── frontend/ # React + Tailwind frontend (in progress)
│── README.md # Project documentation


---

## 🛠️ Tech Stack  

- **Frontend**: React, TailwindCSS, Typescript  
- **Backend**: Cloudflare Workers, Hono.js, Typescript, Prisma  
- **Database**: PostgreSQL 
- **Validation**: Zod  
- **Auth**: JWT  

---

## 🚀 Getting Started  

### 1️⃣ Clone the repo  

git clone https://github.com/Akash2Patil/mediumblog.git
cd mediumblog

Install dependencies

For backend:

cd backend
npm install


For frontend:

cd frontend
npm install

3️⃣ Setup environment variables

Create a .env file in backend/ and add:

DATABASE_URL="your_postgres_connection_url"
JWT_SECRET="your_jwt_secret"

4️⃣ Run the backend (Cloudflare Workers)
npm run dev

5️⃣ Run the frontend
npm start

🌍 Deployment

Backend is deployed on Cloudflare Workers (serverless, global, and fast).

Frontend will be deployed soon.

📌 Roadmap

 JWT Authentication

 Blog CRUD

 Zod Validation

 Complete frontend UI

 Add rich text editor for blogs

 Deployment of frontend

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License

This project is licensed under the MIT License.
