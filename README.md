# Mini Application: Authorization and Posts

This mini application is a React 18  application with TypeScript, incorporating features for authorization and posts management. The application communicates with the backend using the provided API by ThinkEasy.cz!

## Requirements

The application is designed to fulfill the following functionalities:

1. **Authorization and Token Update**: Users can authenticate, and tokens are updated as required.
2. **View All Posts**: Users can view a list of all posts.
3. **View User Posts**: Users can view posts specific to a particular user.
4. **Create a Post**: Users can create new posts.

### Encouraged (Not Required)

1. **Notification of Creation/Editing**: Provide notifications for post creation/editing.
2. **Frontend Error Handling**: Implement frontend error handling for this small application.
3. **Search for Posts**: Allow users to search for posts based on title or content.
4. **Loading Status**: Include loading status indicators such as Skeleton or Spinner.

## Features

- **Authorization Page**: Includes a login form for user authentication.
- **Posts Page**: Displays a list of posts with options to view user-specific posts and create new posts.
- **Notifications**: Toast notifications for post creation/editing.


## Libraries Used

1. **Frontend Framework**: React 18 & Typescript
2. **Bundler**: Webpack & Babel
3. **Form Library**: React-Hook-Form
4. **State Management**: Redux Toolkit Query
5. **API Library and Caching**: Redux Toolkit Query
6. **Notification Library**: Toastify
7. **Styling**: ChakraUI or Tailwind

## Folder Structure

├── /src
│ ├── /components
│ │ ├── /atoms
│ │ | └── ...components  
│ │ ├── /molecules
│ │ │ └── ...components  
│ │ └── /organisms
| │ │ └── ...components  
│ ├── /features
│ │ ├── /auth
│ │ │ ├── api.ts
│ │ │ ├── authSlice.ts
│ │ │ └── types.ts
│ │ └── /post
│ │ │ ├── api.ts
│ │ │ ├── postSlice.ts
│ │ │ └── types.ts
│ ├── Main.tsx
│ ├── App.tsx
│ ├── Error.tsx
│ ├── Layout.tsx
│ ├── index.css
├── /public
│ └── ...
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tailwind.js
├── package.json
└── README.md
```


## How to Run

1. Clone this repository. `Node.js` is a requirement.
2. Install dependencies: `npm install` or `yarn install`.
3. Run the application: `npm run dev` or `yarn run dev`.
4. Open your browser and navigate to `http://localhost:5173`.

## App Snapshots
## License

This project isn't licensed any under entity. Feel free to fork! 
