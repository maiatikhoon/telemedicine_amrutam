**Telemedicine Backend System - README**

A scalable backend service for a telemedicine platform built using Node.js, Express, PostgreSQL (Neon DB), Sequelize, Redis, with complete authentication, doctor availability, slot booking, consultations, prescriptions, payments, audit logs, caching, observability and security best practices.

📌 Overview

This system provides a complete backend solution for a telemedicine workflow:

- User authentication & roles  
- Doctor onboarding & availability slots  
- Patient slot booking  
- Consultation lifecycle  
- Prescription creation
- Payments  
- Audit logs  
- Caching with Redis for <200ms reads  
- Observability (logs)  
- Security (rate limiting, RBAC, validation)   

Fully documented OpenAPI schema

🚀 Technology Stack  

- Language&nbsp :	Node.js  
- Framework&nbsp :	Express.js  
- Database&nbsp :	PostgreSQL (Neon DB)  
- ORM&nbsp :	Sequelize  
- Cache	Redis (Redis Cloud)&nbsp : ioredis  
- Auth&nbsp&nbsp :	JWT + bcrypt  
- Docs&nbsp&nbsp : OpenAPI (Swagger)  
- Observability&nbsp : Morgan  



📥 Installation & Setup  
1️⃣ Clone the Repository  
git clone <your_repo_url>   
cd <your_repo_directory>   

2️⃣ Install Dependencies  
npm install  

3️⃣ Create .env File  

Create a .env file in the project root and fill with your environment values:  
- PORT= 
- POSTGRESQL_URL=  
- apiVersion=  
- REDIS_HOST=  
- REDIS_PORT=  
- REDIS_PASSWORD=     
- JWT_SECRET=  

🗄 Database Setup  
Using Sequelize Sync (Development)  


▶️ Running the Server   
npm run start  


Server starts at:   
http://localhost:3000    

📚 API Documentation  

The OpenAPI (Swagger) documentation is available at:  
https:localhost:3000/api-docs  


The documentation includes:  

- Auth APIs  
- User & Profile  
- Doctor  
- Availability Slots  
- Consultation  
- Prescription  
- Payment  
- Audit Logs  

🛡 Security Features  

- JWT-based authentication  
- Role-Based Access Control (RBAC)  
- Input validation using Joi  
- Rate limiting with express-rate-limit   
- Password hashing with bcrypt   
- Caching with Redis  
- Audit trail for every action  
