# Kanban Todo App

A modern, responsive Kanban-style Todo application built with React and Tailwind CSS. This app allows users to manage tasks across different stages (New, Ongoing, Done), set due dates, and interact with tasks using a context menu. Tasks are persisted in the browser's local storage.

## Features

- **Kanban Board:** Organize tasks into New, Ongoing, and Done columns.
- **Add & Edit Tasks:** Quickly add new tasks with a title and description.
- **Drag-Free Status Management:** Move tasks between columns using a context menu.
- **Due Dates:** Assign and edit due dates for ongoing tasks, with overdue indication.
- **Persistent Storage:** Tasks are saved in local storage for data persistence.
- **Responsive Design:** Fully responsive layout using Tailwind CSS.
- **Accessible UI:** Keyboard and screen reader friendly.
- **Testing:** Includes basic tests with React Testing Library and Jest.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/kanban-todo-app.git
   cd kanban-todo-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

To create an optimized production build:

```sh
npm run build
```
The build output will be in the `build/` directory.

### Running Tests

To run the test suite:

```sh
npm test
```

## Project Structure

```
.
├── public/                 # Static assets and HTML template
├── src/                    # Source code
│   ├── components/         # React components (Column, TodoCard, ContextMenu)
│   ├── context/            # React Context for global state (TodoContext)
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   └── ...                 # Styles, tests, etc.
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

## Technologies Used

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/) (for date formatting)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## Customization

- **Task Status Flow:** Tasks can only move to "Done" from "Ongoing" and cannot move back from "Done" to "Ongoing".
- **Due Dates:** Only "Ongoing" tasks can have due dates. Overdue tasks are visually indicated.
- **Context Menu:** Right-click or use the 3-dot menu on a task to change its status.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements

- [Create React App](https://create-react-app.dev/)
-