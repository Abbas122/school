const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "admin",
  database: "school_db"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected");
});

/* LOGIN (simple demo) */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ message: "Login Successful" });
  } else {
    res.status(401).json({ message: "Wrong credentials" });
  }
});

/* ADD STUDENT */
app.post("/students", (req, res) => {
  const { name, age } = req.body;

  db.query(
    "INSERT INTO students (name, age) VALUES (?, ?)",
    [name, age],
    () => res.json({ message: "Student Added" })
  );
});

/* GET STUDENTS */
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    res.json(results);
  });
});

/* ADD MARKS */
app.post("/marks", (req, res) => {
  const { student_id, subject, marks } = req.body;

  db.query(
    "INSERT INTO marks (student_id, subject, marks) VALUES (?, ?, ?)",
    [student_id, subject, marks],
    () => res.json({ message: "Marks Added" })
  );
});

/* ADD ATTENDANCE */
app.post("/attendance", (req, res) => {
  const { student_id, date, status } = req.body;

  db.query(
    "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)",
    [student_id, date, status],
    () => res.json({ message: "Attendance Recorded" })
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
