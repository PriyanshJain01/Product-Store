import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
//if my status is success, then i will return the data otherwise no data and thus message
// pg handles placeholders with $1, $2, $3 etc. in the query string
// js handles placeholders with ${1}, ${2}, ${3} etc. in the query string
//pg is preferred for placeholders to avoid confusion with js placeholders
const db2 = new pg.Client({
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database2,
  port: process.env.db_port,
});

db2.connect();

//CRUD operations for products(Create, read, update and delete)
export const createUser = async (req, res) => {
  const { username, fname, lname, password } = req.body;

  if (!username || !fname || !lname || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newUser = await db2.query(
      "Insert into users (username, fname, lname, password) values($1,$2,$3,$4) returning *",
      [username, fname, lname, password]
    );

    console.log("New User Added : ", newUser.rows[0]);
    res.status(201).json({ success: true, data: newUser.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }
    console.log("Error creating User: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await db2.query("Select * from users where username=$1", [username]);
    if (user.rows.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("User fetched successfully: ", user.rows[0]);
    res.status(200).json({ success: true, data: user.rows[0] });
  } catch (error) {
    console.log("Error getting user: ", error);
    res.status(500).json({ success: false, message: "Internal Server Errpr" });
  }
};
