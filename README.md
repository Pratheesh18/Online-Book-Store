# 📚 Book Dashboard Project

A responsive book management dashboard built using **Vue.js**. This project allows users to manage a collection of books with features like search, sort, add, edit, delete, and image upload. It utilizes a **Node.js** backend with **Express.js** and supports JWT-based user authentication.

## 🛠️ Technologies Used

### Frontend
- **Vue.js**: JavaScript framework for building user interfaces.
- **Bootstrap 5**: For responsive and sleek UI components.
- **Vue Toastification**: For user notifications (success, error messages).
- **Axios**: For making HTTP requests to the backend API.

### Backend
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **MongoDB**: NoSQL database for storing book details.
- **Multer**: Middleware for handling file uploads (images).
- **JWT**: JSON Web Token for secure user authentication.

## 💻 Features

1. **User Authentication**:
   - Secure login and registration using JWT.
   - Protected routes for the dashboard.

2. **Book Management**:
   - Add a new book with details (title, author, genre, price, ISBN, and image upload).
   - Edit existing book details.
   - Delete a book from the collection.
   - View a list of all books with search and sort functionalities.

3. **Search and Sort**:
   - Real-time search by book title using debounced input.
   - Sort by price (low to high) or title (alphabetical order).
   - Option to reset sorting to the default order.

  

## 🚀 Getting Started

Follow the steps below to run this project locally.

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16+)
- **npm** (Node Package Manager)
- **MongoDB** (local or cloud instance)

### 📦 Backend Setup

1. Clone the repository and navigate to the backend folder:

   ```bash
   git clone https://github.com/your-username/book-dashboard.git
   cd Backend
   npm install
   npm start

### 📦 Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd simple-books
   npm install
   npm run dev


