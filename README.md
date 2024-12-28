# Takumi

**Takumi** (匠), inspired by the Japanese word for "artisan" or "master craftsman," reflects our commitment to precision, expertise, and dedication in software craftsmanship. This project is a modern React application built with Vite, designed to deliver a seamless and efficient task management experience.


## **Table of Contents**
1. [Overview](#overview)
2. [Code Architecture](#code-architecture)
3. [Key Decisions](#key-decisions)
4. [Setup Instructions](#setup-instructions)
5. [Deployment](#deployment)

---

## **Overview**

This project leverages modern web technologies like **React** and **Vite** to ensure fast development, optimized builds, and excellent performance.

### **Key Features**
- Component-based UI with reusable, modular design.
- State management using **useState**.
- Fully responsive design optimized for all devices.
- Integration with RESTful APIs for data fetching and persistence.
- For the POC - we have named the board id to backend1

---

## **Code Architecture**

The application follows a modular and scalable file structure:

|   App.tsx
|   index.css
|   main.tsx
|   vite-env.d.ts
|
+---api
|       axiosInstance.ts
|       taskApi.ts
|
+---assets
|       react.svg
|
+---components
|   |   Board.tsx
|   |   Navbar.tsx
|   |   Section.tsx
|   |   Task.tsx
|   |
|   \---ui
|           Button.tsx
|           Modal.tsx
|
+---hooks
|       useTask.ts
|       useTaskActions.ts
|
\---types
        index.ts

### **Core Components**
- **Task:** Displays, edits, and deletes tasks with ease.
- **Board** Displays all the sections- todo,in progress and done
- **Modal:** A reusable component for displaying modals (e.g., for editing or viewing task details).
- **Button:** Customizable button component with various styles and variants.

---

## **Key Decisions**

1. **Name & Philosophy:**
   - The project is named **Takumi** to reflect the values of craftsmanship, precision, and dedication to quality.

2. **Vite as the Build Tool:**
   - Selected for its blazing-fast builds and development experience compared to traditional tools like CRA.

3. **Reusable Components:**
   - Modular design to ensure components like `Modal` and `Button` are reusable across the app.

4. **Environment Variables:**
   - Leveraged `VITE_` prefixed variables for secure and scalable configuration of API endpoints.

5. **Scalability:**
   - Built with scalability in mind, allowing future integration of advanced features like state management tools (Redux/Context) or additional APIs.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/kavithashanmugan/takumi-board.git
cd takumi-board

### **2. Installation**
npm install

### **3. Running the project locally in development
npm run dev

### **4. Generate the build
npm run build


## **Future Enhancements**
-include state management using react redux
-add more features such as board name so that users can add more boards
-add authentication
-add sorting and filtering according to due dates and people assigned

## **References**
-Drag and Drop in Pure TypeScript and React – Kenneth Lange (https://kennethlange.com/drag-and-drop-in-pure-typescript-and-react/)
-Install Tailwind CSS with Vite - Tailwind CSS - (https://tailwindcss.com/docs/guides/vite)
-add dashboard to visualize performance metrics based on completion status
