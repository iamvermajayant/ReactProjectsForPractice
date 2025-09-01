// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/birthdaybuddy")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// ✅ Schema + Model
const FriendSchema = new mongoose.Schema({
  name: String,
  birthday: String, // "YYYY-MM-DD"
  friendsEmail: String,
  reminder: { type: Boolean, default: false },
});
const Friend = mongoose.model("Friend", FriendSchema);

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// ✅ Routes
app.get("/api/friends", async (req, res) => {
  const friends = await Friend.find();
  res.json(friends);
});

app.post("/api/friends", async (req, res) => {
  const friend = new Friend(req.body);
  await friend.save();
  res.json(friend);
});

app.patch("/api/friends/:id", async (req, res) => {
  const { id } = req.params;
  const friend = await Friend.findByIdAndUpdate(id, req.body, { new: true });
  res.json(friend);
});

// ✅ Helper: check if today is birthday
function isBirthday(dateStr) {
  const today = new Date();
  const bd = new Date(dateStr);
  return (
    today.getDate() === bd.getDate() &&
    today.getMonth() === bd.getMonth()
  );
}

// ✅ Cron Job → run daily 9:00 AM
cron.schedule("21 9 * * *", async () => {
  console.log("🔔 Checking birthdays...");
  const friends = await Friend.find({ reminder: true });

  for (const f of friends) {
    if (isBirthday(f.birthday)) {
      try {
        await transporter.sendMail({
          from: `"Birthday Buddy 🎂" <${process.env.EMAIL_USER}>`,
          to: f.friendsEmail,
          subject: `🎉 Happy Birthday ${f.name}!`,
          text: `Hey ${f.name},\n\nWishing you a wonderful birthday 🥳🎂🎁!\n\n- Birthday Buddy`,
        });
        console.log(`✅ Email sent to ${f.friendsEmail}`);
      } catch (err) {
        console.error("❌ Error sending email:", err);
      }
    }
  }
});

// ✅ Start server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
