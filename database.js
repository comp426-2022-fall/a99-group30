// Import better-sqlite3 and bcrypt for hashing password
import Database from "better-sqlite3"
import bcrypt from "bcrypt"
// Create a database connection
const db = new Database('food.db')
// Used for bcrypt hashing
const saltRounds = 10

// Create Users table if it does not exist
const usersInit = db.prepare(`CREATE TABLE IF NOT EXISTS Users (
                       login TEXT PRIMARY KEY,
                       email TEXT,
                       password TEXT,
                       UNIQUE(email));`)
usersInit.run()
// Create Meals table if it does not exist
// Table is used to keep track of recent meals searched for by user
const mealsInit = db.prepare(`CREATE TABLE IF NOT EXISTS Meals (
                        login TEXT,
                        name TEXT,
                        FOREIGN KEY(login) REFERENCES Users(login) ON DELETE CASCADE,
                        PRIMARY KEY(login, name));`)
mealsInit.run()

// Insert new user into Users table
export function addUser(login, email, password) {
  // Check if email is UNIQUE before insertion
  let stmt = db.prepare('SELECT * FROM Users WHERE email=?')
  let info = stmt.get(email)
  if (info) {
    console.log("Email already in use.")
    return
  }
  // Hash password before inserting into database
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  // Add user to Users table
  stmt = db.prepare('INSERT OR IGNORE INTO Users (login, email, password) VALUES(?, ?, ?)')
  info = stmt.run(login, email, hash)
  if (info.changes) {
    console.log("User " + login + " created.")
  }else {
    console.log("User account already exists.")
  }
}

// Get user info from Users table
export function getUser(login, password) {
  const stmt = db.prepare('SELECT * FROM Users U WHERE U.login=?')
  const user = stmt.get(login)
  const hash = user.password
  // Check if password matches hash before returning user info
  if (bcrypt.compareSync(password, hash)) {
    // Password matches hash
    console.log(user)
    return user
  }else {
    console.log("Incorrect password.")
    return null
  }
}

// Delete a user from Users table
export function delUser(login, password) {
  const stmt = db.prepare('SELECT U.password FROM Users U WHERE U.login=?')
  const user = stmt.get(login)
  const hash = user.password
  // Check if password matches hash before deleting user
  if (bcrypt.compareSync(password, hash)) {
    // Password matches hash
    const remove = db.prepare('DELETE FROM Users WHERE login=?')
    remove.run(login)
  }else {
    // Password does not match hash
    console.log("Incorrect password.")
  }
}

// Insert a user's meal into Meals
export function addMeal(login, meal) {
  const stmt = db.prepare('INSERT OR IGNORE INTO Meals (login, name) VALUES(?, ?)')
  const info = stmt.run(login, meal)
  if (info.changes) {
    console.log("Added " + meal + " for user: " + login)
  }else {
    console.log("Meal already exists for user: " + login)
  }
}

// Get all meals for a user
export function getMeals(login) {
  const stmt = db.prepare('SELECT * FROM Meals WHERE login=?')
  const info = stmt.all(login)
  //console.log(info)
  return info
}

// Insert test values to users and meals
function testTables() {
  addUser('admin', 'admin@admin.admin', 'securepass123')
  addUser('test', 'admin@admin.admin', 'notapass')
  addMeal('admin', 'chicken')
  addMeal('admin', 'food')
  addMeal('admin', 'banana')
  getMeals('admin')
  getUser('admin', 'securepass123')
  delUser('admin', 'securepass123')
}

//testTables()

// Export database
export default db;
