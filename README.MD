# Devcircle API
> **Backend API for Devcircle Bootcamp App**

![node](https://img.shields.io/badge/NodeJS-12.15-brightgreen) ![express](https://img.shields.io/badge/Express-4.17.1-lightgrey) ![db](https://img.shields.io/badge/MongoDB-4.2.0-yellowgreen) ![docker](https://img.shields.io/badge/Docker%20-19.03.05-blue) ![heroku](https://img.shields.io/badge/Deploy-Heroku-orange)

![devcircle](https://i.postimg.cc/x8SPTXnR/devcircle.jpg)



**Build using NodeJS, Express & MongoDB Atlas. Implementing JSON Web Token, Password Encryption, Handle CORS, Prevent Cross Site Scripting Attack and much more. Deploy on Heroku inside a Docker Container.**
- Version: 1.0
- License: MIT
- Author: [Faeshal](https://faeshal.com)

**Detail Usage :** 
* **[Postman - Docs](https://www.getpostman.com/collections/b06797f227fb8ec694f4)**

### **Step Local Instalation** 
Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

### Install Dependencies

```
npm install
```

### Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

### Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

### **API Details & Specification**
### Bootcamps
- List all bootcamps in the database**
   * Pagination
   * Select specific fields in result
   * Limit number of results
   * Filter by fields
- Search bootcamps by radius from zipcode
  * Use a geocoder to get exact location and coords from a single address field
- Get single bootcamp
- Create new bootcamp
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only one bootcamp per publisher (admins can create more)
  * Field validation via Mongoose
- Upload a photo for bootcamp
  * Owner only
  * Photo will be uploaded to local filesystem
- Update bootcamps
  * Owner only
  * Validation on update
- Delete Bootcamp
  * Owner only
- Calculate the average cost of all courses for a bootcamp
- Calculate the average rating from the reviews for a bootcamp

### Courses
- List all courses for bootcamp
- List all courses in general
  * Pagination, filtering, etc
- Get single course
- Create new course
  * Authenticated users only
  * Must have the role "publisher" or "admin"
  * Only the owner or an admin can create a course for a bootcamp
  * Publishers can create multiple courses
- Update course
  * Owner only
- Delete course
  * Owner only
  
### Reviews
- List all reviews for a bootcamp
- List all reviews in general
  * Pagination, filtering, etc
- Get a single review
- Create a review
  * Authenticated users only
  * Must have the role "user" or "admin" (no publishers)
- Update review
  * Owner only
- Delete review
  * Owner only

### Users & Authentication
- Authentication will be ton using JWT/cookies
  * JWT and cookie should expire in 30 days
- User registration
  * Register as a "user" or "publisher"
  * Once registered, a token will be sent along with a cookie (token = xxx)
  * Passwords must be hashed
- User login
  * User can login with email and password
  * Plain text password will compare with stored hashed password
  * Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  * Cookie will be sent to set token = none
- Get user
  * Route to get the currently logged in user (via token)
- Password reset (lost password)
  * User can request to reset password
  * A hashed token will be emailed to the users registered email address
  * A put request can be made to the generated url to reset password
  * The token will expire after 10 minutes
- Update user info
  * Authenticated user only
  * Separate route to update password
- User CRUD
  * Admin only
- Users can only be made admin by updating the database field manually

### **Security**
- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

### **Documentation**
- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api


🗡 **February 2020 - [faeshal.com](https://faeshal.com)**




