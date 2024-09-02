# Meet Space

A meeting room booking application built with React, Redux, and Tailwind CSS, designed to provide a seamless and user-friendly experience for managing room reservations. The application features a modern UI and includes functionalities such as booking management, payment processing, and user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Features

- **Room Browsing:** Browse and select rooms with real-time availability.
- **Booking Management:** Manage and confirm bookings with detailed information.
- **Admin Management:** Create, update, and manage rooms, slots, and bookings.
- **Payment Integration:** Secure payment processing for bookings.
- **User Authentication:** Sign up and log in.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - Redux Toolkit
  - React Query
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **State Management:**
  - Redux
- **Styling:**
  - Tailwind CSS
- **UI Components:**
  - Shadcn UI and Tailwind CSS
- **Payment Integration:**
  - Stripe

## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/omarfaruktaj/meet-space.git meet-space
   cd meet-space
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables:

   ```plaintext
   VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-upload-preset
   VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
   ```

4. **Start the development server:**

   ```bash
   yarn run dev
   ```

   The application should now be running at `http://localhost:5173/`.

## Usage

### Booking a Room

1. Navigate to the homepage to view available rooms.
2. Select a room and pick a date and time slot.
3. Confirm your booking details in the confirmation modal.
4. Proceed to payment and complete the booking.

### Managing Bookings

- View your bookings under the "My Bookings" section.
- Check your booking status from your account.
