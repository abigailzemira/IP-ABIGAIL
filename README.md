# IP-ABIGAIL

IP-ABIGAIL is a full-stack application designed to help users keep track of the books they've read. Users can search for books, add them to their personal collection, manage their reading status, and receive book recommendations based on their collection.

## Features

- **Book Tracking:** Keep a personal library of books you've read or want to read.
- **Search:** Find books to add to your collection.
- **Reading Status:** Set and update your progress for each book.
- **Recommendations:** Get personalized book recommendations based on your collection.
- **Authentication:** Secure login via Google OAuth and JWT.
- **Modern UI:** Built with TailwindCSS, DaisyUI, and Flowbite for a responsive and attractive design.
- **Cloud Integration:** Utilizes AWS and Firebase for storage and hosting.
- **AI Integration:** Gemini AI powers smart recommendations and search.

## Tech Stack

- **Frontend:** React, Redux, HTML & CSS, TailwindCSS, DaisyUI, Flowbite
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Testing:** Jest
- **Cloud & Auth:** AWS, Firebase, Google OAuth, JWT
- **AI:** Gemini AI

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abigailzemira/IP-ABIGAIL.git
   cd IP-ABIGAIL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory.
   - Copy the structure from `.env.example` and fill in your credentials.

4. **Run the app**
   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000` (or the port you specify).

### Scripts

- `npm start` — Start the development server
- `npm test` — Run tests with Jest
- `npm run build` — Build for production

## Environment Variables

Please refer to the `.env.example` file for the required environment variables. These typically include database credentials, API keys, and third-party service configs.

## Contributing

Currently, the project is maintained solely by [abigailzemira](https://github.com/abigailzemira).

## License

This project is licensed under the MIT License.

---

Happy reading! 📚
