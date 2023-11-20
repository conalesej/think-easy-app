

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
2. **Routing and Route Protection**: React Router v6
3. **Bundler**: Webpack & Babel
4. **Form Library**: React-Hook-Form
5. **State Management**: Redux Toolkit Query
6. **API Library and Caching**: Redux Toolkit Query & Persist-Redux
7. **Notification Library**: Toastify
8. **Styling**: ChakraUI or Tailwind

## Folder Structure
```
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
### Authentication and Authorization
#### Login and Signup Page
![image](https://github.com/conalesej/think-easy-app/assets/60915940/c23d849a-d7fc-4a5f-8181-3904ca9bce73)
#### Logging in and out
[https://github.com/conalesej/think-easy-app/assets/60915940/f3d6ce5a-7350-4473-8630-53cd4a798201](https://github.com/conalesej/think-easy-app/assets/60915940/3708c84e-3b4e-405c-80c9-ff666b07adf1)
#### Automatic token Refresh
https://github.com/conalesej/think-easy-app/assets/60915940/f41f654e-bfa0-41cb-8465-1c1dc7d36d13
### Posts and filter functions
#### View all Posts and search functionality
https://github.com/conalesej/think-easy-app/assets/60915940/e959a02c-d209-421b-8dbe-cc7f56a78dd7
#### Create a Post
https://github.com/conalesej/think-easy-app/assets/60915940/ee4bf819-1154-4dca-8479-815537f12f99
#### View specific Post Details
https://github.com/conalesej/think-easy-app/assets/60915940/2c02d5f8-6e32-4ecb-8939-daae7f840a3a
#### View posts of a Specific User
https://github.com/conalesej/think-easy-app/assets/60915940/dc89ae90-b74d-4b4d-98b6-22b423bf5dbf

### FE Loader and Error handling
#### All Posts Skeleton
https://github.com/conalesej/think-easy-app/assets/60915940/ed0d8bfc-7af5-437b-8e13-52caf3a16894
#### Specifc User's Posts
https://github.com/conalesej/think-easy-app/assets/60915940/b5b915b3-3e72-4083-bd72-bf8e9622b17a
#### Specific Details Skeleton 
https://github.com/conalesej/think-easy-app/assets/60915940/813d536d-f8d3-4a50-b761-34cb311a571a
#### Empty / 404 Posts
![image](https://github.com/conalesej/think-easy-app/assets/60915940/2f4e56a9-e4e7-4f9e-bb89-3e7ad0a5f13f)


## License

This project isn't licensed any under entity. Feel free to fork! 
