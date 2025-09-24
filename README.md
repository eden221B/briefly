# 🛒 Product Summarizer & Comparison Web App

A modern web app that **summarizes products using AI** and **compares them** based on pros, cons, price, and value score. Designed for personal product research and decision-making.

---

## 🚀 Features

- User signup/login with session persistence
- Add products and generate AI-powered summaries
- View saved summaries in **card format**
- Compare products with a **dynamic comparison table**
- Delete summaries on the fly
- Responsive, clean, and minimal UI

---

## ⚡ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. **Backend setup**
cd backend
npm install
npm run dev   # runs server on localhost:5050

3. **Frontend setup**
cd ../frontend
npm install
npm start     # opens React app on localhost:3000

 **Architecture**

Frontend: React, functional components, useState/useEffect for state

Backend: Node.js + Express, REST APIs for:

Authentication (/api/auth/login, /api/auth/signup)

Product summaries (/api/summaries)

Product comparison (/api/compare)

AI Layer: Currently mocked, can integrate OpenAI / HuggingFace

Data Storage: LocalStorage for session; intended MongoDB for production

 **Workflow**
User → Auth → Add Products → Generate Summaries → Save → Compare → View Results

**Future Considerations**

Scalability: Use proper DB, implement pagination, batch AI processing

Caching: Store generated summaries to reduce repeated AI calls

Monitoring & Logging: Tools like Sentry or Winston

Authentication & Security: Move to JWT / OAuth, enforce HTTPS

Deployment: Containerize backend with Docker, CI/CD automation
