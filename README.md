# 🎂 Birthday Buddy

A simple **birthday reminder app** built with **Node.js, Express, MongoDB, Cron Jobs, and Nodemailer**.  
It allows you to store your friends’ birthdays and automatically send them an email reminder on their special day.  

---

## ✨ Features
- 📅 Add, edit, and view friends’ birthday details  
- ✉️ Send automated birthday wishes via **Gmail** using Nodemailer  
- ⏰ Daily cron job that checks birthdays at **9:15 AM**  
- ✅ Toggle reminder flag (only send emails when reminder is enabled)  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Email:** Nodemailer with Gmail App Password  
- **Scheduler:** node-cron  
- **Frontend:** React (cards UI with reminder flag)  

---

## 📦 Installation

1. **Clone repo**
   ```bash
   git clone https://github.com/your-username/birthday-buddy.git
   cd birthday-buddy
