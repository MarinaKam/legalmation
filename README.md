# LegalMation ReactJS Coding Challenge Documentation

This repository contains the solution for the LegalMation ReactJS Coding Challenge, which demonstrates proficiency in ReactJS, Redux Toolkit, Vite.js, Vitest, and MirageJS.

---

## Project Overview

The LegalMation ReactJS Coding Challenge required the creation of a React application with the following features:

- Implement CRUD (Create, Read, Update, Delete) operations for at least one resource type.
- Use Redux Toolkit for state management.
- Utilize Vite.js as the bundler.
- Set up MirageJS for mocking a REST API server.

---

## Application Requirements

### Author Requirements

1. **Viewing a List of Resources**:
    - Users can view a list of resources.

2. **Resource Filtering**:
    - Users can filter the list of resources by at least one attribute (implemented by name).

3. **Viewing Resource Details**:
    - Clicking on a resource in the list displays detailed information.

4. **Creating a New Resource**:
    - Users can create a new resource.

5. **Updating Resource Details**:
    - Users can update existing resource details.

6. **Deleting a Resource**:
    - Users can delete an existing resource.

7. **Managing Books for Authors**:
    - Users can add and remove books associated with each author.
    - Books related to an author can be displayed and managed within the application.

---

**Implementation Status**: These user requirements have been implemented as specified in the project. For details, refer to the respective sections of the codebase.

---

## Testing

The project includes tests to ensure comprehensive coverage of its functionality:

- **Test Framework**: Vitest is used as the testing framework.
- **Test Coverage**: Tests cover components, actions, and reducers.
- **Running Tests**: Execute `npm test` to run tests locally.

---

**Testing Status**: The majority of unit tests and integration tests have been implemented to demonstrate proficiency with testing practices. These tests cover key functionalities and ensure that the application behaves as expected. For detailed test coverage, refer to the src/test directory in the project repository.

---

## Project Structure

The project is organized as follows:

- `src/`: Source code directory.
- `src/components/`: React components.
- `src/dashboard/`: Main page.
- `src/theme/`: theme setup.
- `src/store/`: Redux store configuration, actions, and reducers.
- `src/api/`: api setup.
- `src/mirage/server.ts`: MirageJS server setup.
- `src/test/`: Test files for components and Redux slices.

---

## Setup Instructions

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/MarinaKam/legalmation.git
   cd legalmation
2. Install dependencies:
   ``npm install``
3. Start the development server:
   ``npm run dev``
4. Open [localhost:3000](http://localhost:3000) in your browser.
