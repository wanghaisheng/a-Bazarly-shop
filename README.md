# Game Spaces

## Introduction

**Game Spaces** is a sports booking platform.

## Project Description

**Game Spaces** allows users to book sports facilities with ease and provides admins the ability to manage these facilities and bookings. Users can book sports facilities online with ease! From courts to fields, find and reserve the perfect space for their next game or event!

### [Live Site](https://bazarly.vercel.app)

```base
https://bazarly.vercel.app
```

## Features

- **User Authentication and Authorization:**
  Users can sign up and log in using their email and password. Admins have additional powers for managing facilities and bookings.

- **Booking System:**
  Users can book facilities by specifying the date, start time, and end time. The system calculates the payable amount based on the duration of the booking.

- **Availability Checking:**
  Users can check the availability of facilities for a specific date.

- **Booking Cancellation:**
  Users have the ability to cancel their bookings.

- **View Bookings:**
  Admins can view all bookings, while users can view only their own bookings. This helps in managing and tracking reservations efficiently.

- **Facility Management:**
  Admins can create, update, and delete facilities. Each facility has details like name, description, price per hour, and location.

- **Error Handling:**
  Comprehensive error handling ensures proper responses and messages for validation errors, duplicate entries, and not found routes.

- **Authentication Middleware:**
  Middleware is implemented to protect routes, ensuring that only authenticated users and admins can access their respective routes.

- **Security:**
  Powerful security system is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.

- **Maintainable Codebase:**
  The codebase is written with clean, well-organized, and documented coding practices. Followed by the industry standard, the codebase is written in structured and organized way.

## Technology Stack

- React
- Redux
- TypeScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Shadcn UI

## Installation Guideline

Follow the instructions given below to install and run the project locally.

### Prerequisites

- Node.js
- Code Editor (E.g. Visual Studio Code)

### Installation Steps

1. **Clone the Repository:**

   ```base
   git clone https://github.com/Rahad-Ullah/bazarly-client.git
   ```

2. **Open in a Code Editor:**
   Open the directory in a code editor like VS Code.
3. **Install Dependencies:**

   ```markdown
   npm install
   ```

4. **Run the project:**

   ```markdown
   npm run dev
   ```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add these configuration variables in the `.env.local` file.
   Example:
   ```bash
    PORT=5173
    VITE_GOOGLE_MAP_API_KEY=your_google_map_api_key
   ```

## Usage

Browse the website in your browser and get the full experience.

## Happy Coding 😎
