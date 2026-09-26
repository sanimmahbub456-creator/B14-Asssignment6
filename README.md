# B14-Asssignment6

A modern, responsive workout library and daily workout planning application built with Next.js, React, TypeScript, and Tailwind CSS. FitLog helps users browse workouts, view detailed exercise information, save workouts for later, and build a daily workout plan with a maximum of five exercises.

---

## 🚀 Live Project

Live Demo:https://serene-crumble-d240fb.netlify.app/

GitHub Repository: https://github.com/sanimmahbub456-creator/B14-Asssignment6

---

## 📌 Project Description

FitLog is a dark-themed workout library designed for simple and focused workout planning.

Users can:

- Browse a workout library
- View detailed workout information
- Add workouts to today's plan
- Save workouts for later
- Remove workouts from their plan
- Mark workouts as completed
- Sort workouts by duration, calories, or rating
- See workout statistics
- Keep their plan and saved workouts using browser localStorage

The interface is designed to be responsive across mobile, tablet, and desktop devices.

---

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router
- REST API
- Browser LocalStorage
- HTML
- CSS
- Git & GitHub

---

## 🔗 API
FitLog uses the following REST API:
https://api.abcz.workers.dev/api/fitlog
The application fetches workout data dynamically from the API.

## Features
# 1. Responsive Navigation
FitLog logo
Workout navigation
My Plan navigation
Plan counter
Saved counter
Responsive mobile navigation
Active navigation state
# 2. Hero Section
WORKOUT LIBRARY eyebrow
Main heading:
TRAIN WITH INTENT. LOG EVERY SET.
Workout-focused introduction
Browse Workouts CTA
Responsive workout banner
# 3. Workout Library
Displays workouts from the API
Responsive workout cards
Muscle group tags
Workout name
Equipment
Duration
Calories
Rating
View workout details
# 4. Workout Details
Each workout detail page includes:
Large workout image
Workout title
Muscle group tags
Description
Equipment
Difficulty
Sets
Reps
Duration
Calories
Rating
Exercise instructions
Add to Today's Plan
Save for Later

# 5. My Plan
The My Plan page includes:
Today's workout plan
Saved workouts
Exercise counter
Total workout minutes
Total calories
Maximum five exercises
Duration sorting
Calories sorting
Rating sorting
Workout thumbnails
Equipment information
Duration
Calories
Rating
View Details
Mark as Done
Remove workout

# 6. Saved Workouts
Users can save workouts for later.
Saved workouts are available from the Saved tab on the My Plan page.

# 7. Mark as Done
Users can mark a workout as completed.
The workout is removed from Today's Plan and a confirmation toast is displayed.

# 8. LocalStorage
FitLog stores:
Today's workout plan
Saved workouts

in the browser's localStorage so the user's selections remain after refreshing the page.

# 9. Toast Notifications
The application provides feedback for actions such as:
Workout added to plan
Workout removed
Workout saved
Workout already saved
Workout marked as done
Plan limit reached

# 10. Loading State
A custom loading screen is provided while pages are loading.

# 11. Custom 404 Page
FitLog includes a custom 404 page for unavailable routes and workouts.
# 12. Responsive Design
The application is designed for:
Mobile
Tablet
Desktop

## 📂 Project Structure
----------
B14-Asssignment6/
│
├── public/
│   ├── logo.png
│   └── banner.png
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   │
│   │   ├── my-plan/
│   │   │   └── page.tsx
│   │   │
│   │   └── workout/
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── home.tsx
│   │   ├── detail.tsx
│   │   ├── plan.tsx
│   │   ├── icons.tsx
│   │   └── store.tsx
│   │
│   └── lib/
│       ├── api.ts
│       └── types.ts
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
-----
## 💻 Getting Started
1. Clone the repository
git clone https://github.com/sanimmahbub456-creator/B14-Asssignment6.git
2. Go to the project directory
   cd B14-Asssignment6
3. Install dependencies
npm install
4. Start the development server
npm run dev
Open:
http://localhost:3000

🏗️ Production Build
To check the production build:
npm run build
To start the production server:
npm start

## 🎨 Design
# FitLog uses a dark fitness-focused visual style with:
Black background
White typography
Acid green accent color
Strong uppercase headings
Minimal card design
Responsive layouts
Clear workout statistics

## 📱 Responsive Behavior
The interface adapts to different screen sizes.
Desktop
Three-column workout library
Two-column workout detail
Full navigation
Expanded workout cards
Tablet
Responsive two-column layouts where appropriate
Adapted navigation and spacing
Mobile
Single-column workout cards
Mobile navigation
Stacked action buttons
Responsive typography
Touch-friendly controls

## 📋 Assignment Requirements Covered
 Responsive design
 Navbar
 Workout library
 Workout cards
 Workout details
 My Plan page
 Saved workouts
 Add to Today's Plan
 Remove workout
 Mark as Done
 Toast notifications
 Loading state
 Custom 404 page
 Sorting
 LocalStorage
 Responsive mobile/tablet/desktop layout
 Git/GitHub version control
 Production build
 
##  Learning & Implementation
This project was developed as part of a Programming Hero assignment.
I used learning resources and examples to understand:
React fundamentals
Next.js App Router
TypeScript
Component-based development
API integration
Client-side state management
LocalStorage
Responsive UI development
Tailwind CSS
Git and GitHub
The project was implemented and customized for the FitLog assignment based on my own understanding of the technologies.

## 🙏 Acknowledgements
Special thanks to Jhankar Mahbub  and Ahashan Habib Utsho for their educational guidance and coding resources.
Their teaching helped me better understand concepts including:
React and Next.js
Component-based development
API integration
Routing
Responsive web development
State management
Modern frontend project structure
Learning Sources
Jhankar Mahbub — Programming Hero
Ahashan Habib Utsho— Web Development learning resources

This project is an educational implementation and is not presented as an original reproduction of any instructor's project.

👨‍💻 Author
Mahbubul Alam

FitLog — Workout Library
