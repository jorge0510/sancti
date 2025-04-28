# Saints Directory Web App

A simple web application to browse, search, and favorite Catholic saints.  
Built with **Node.js**, **Express**, **EJS**, **MongoDB**, and **vanilla JavaScript**.

---

## Features

- List all saints with their basic information (birth, death, vocation, country).
- Search saints dynamically by name.
- Mark saints as favorites with a star icon.
- View all saints or only favorited saints.
- Favorites are saved per user in the database.
- Smooth, minimalistic user experience with instant UI updates.

---

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB (favorites storage)
- Frontend:
  - EJS templates
  - Vanilla JavaScript (no frameworks)
  - Font Awesome icons (for star/favorite)

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/saints-directory.git
   cd saints-directory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:  
   Create a `.env` file with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Run the server**:
   ```bash
   node server.js
   ```
    Navigate to `localhost:8080`

---

## How It Works

- When a user logs in and visits the profile page, the server sends:
  - The list of saints.
  - The list of the user's favorites.
- Saints are dynamically rendered in the frontend.
- Clicking the star toggles the favorite status for a saint.
- Favorites are stored in the `favorites` collection in MongoDB, associated with the user ID.
- The interface allows toggling between viewing **All Saints** and **Favorites Only**.

---

## Future Improvements

- Pagination or lazy loading for large saint databases.
- Add filters by country, century, or vocation.
- Allow viewing full saint profiles with extended biographies.
- Dark mode toggle.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons.
- Catholic databases for saint data.

---

## Author

[Jorge Garcia](https://github.com/jorge0510)
