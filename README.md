
# Scrap Pickup Platform - React Native

This project is a simplified simulation of a scrap pickup service, built as a mobile application using React Native and Expo. It consists of two user-facing applications bundled into one: a **Customer App** for scheduling pickups and a **Partner App** for managing and completing them.

This application demonstrates core mobile development concepts including user authentication, state management with Context API, navigation, and integration with a mock REST API.

## Features

### Customer App
- **Phone Number Authentication**: Secure login using a phone number and a mocked OTP.
- **Schedule Pickups**: An intuitive form with date pickers and input validation to schedule a new scrap pickup.
- **Order History**: View a complete list of all past and current pickup requests.
- **Real-Time Status Tracking**: See the status of a pickup change in real-time as the partner progresses through the workflow (from `Pending` to `Completed`).
- **Approval Workflow**: Review the final itemized list and total amount calculated by the partner before approving the completion of an order.
- **View Pickup Code**: Once a partner accepts a request, a unique pickup code is displayed to the customer for verification.

### Partner App
- **Phone Number Authentication**: Separate login for partners.
- **View Available Jobs**: See a list of all `Pending` pickup requests scheduled by customers.
- **Accept and Manage Pickups**: Accept jobs, which assigns the pickup to the partner and notifies the customer.
- **Pickup Workflow**:
  - Securely start a pickup by entering the customer-provided pickup code.
  - Add scrap items with their weight and calculated price.
  - Submit the final itemized list and total amount to the customer for approval.
- **Real-Time Updates**: The partner's list of assigned jobs updates as they progress and as new jobs become available.

## Demo Video

You can watch a full video demonstration of the app on YouTube:
[[https://www.youtube.com/watch?v=your_video_id](https://www.youtube.com/shorts/rpkcosTQmho)](https://www.youtube.com/watch?v=your_video_id)



**Example:**
| Login Screen | Customer Dashboard | Partner Pickups |
| :---: |:---:|:---:|
| *(Screenshot of Login)* | *(Screenshot of Customer Dashboard)* | *(Screenshot of Partner Pickup List)* |


## Tech Stack & Libraries

- **Framework**: [React Native](https://reactnative.dev/) (with [Expo](https://expo.dev/))
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Stack Navigator)
- **State Management**: [React Context API](https://react.dev/reference/react/useContext)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Local Storage**: [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- **UI Components**: [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) for date selection.
- **Mock Backend**: [json-server](https://github.com/typicode/json-server)

## How the Backend is Mocked

This project uses `json-server` to simulate a full REST API, providing a persistent data layer that both the Customer and Partner apps can interact with.

- The database is a simple `db.json` file located at the root of the project.
- It exposes RESTful endpoints for `users` and `pickups`.
- The `PickupContext` in the app handles all API calls (GET, POST, PATCH) to this server, providing a single source of truth for the application state.
- "Real-time" updates are simulated by polling the API periodically (e.g., every 15 seconds) and on screen focus, ensuring that changes made in one app are reflected in the other.

---

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or newer)
- [Expo Go](https://expo.dev/go) app installed on your physical iOS or Android device.
- A terminal or command prompt.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Install all the required npm packages.

```bash
npm install
```

### 3. Run the Mock API Server

The `json-server` must be running for the app to function.

- Open a **separate, dedicated terminal window**.
- Navigate to the project directory and run:

```bash
npm run api
```
This will start the mock API on port `3001`. You should see a "Watching..." message. **Keep this terminal window open.**

### 4. Configure Your Local IP Address

The mobile app needs to know your computer's local IP address to connect to the API server.

1.  **Find your computer's IPv4 address.**
    -   On **Windows**, open Command Prompt and run `ipconfig`.
    -   On **macOS/Linux**, open Terminal and run `ifconfig` or `ip addr`.
    -   (It will look like `192.168.X.X`).

2.  **Update the configuration file.**
    -   Open the file: `src/utils/constants.js`
    -   Change the `API_URL` constant to your IP address:

    ```javascript
    // e.g., if your IP is 192.168.1.10
    export const API_URL = 'http://192.168.1.10:3001';
    ```

### 5. Run the Application

1.  Go back to your **first terminal window** (or open a new one).
2.  Ensure your computer and your phone are on the **same Wi-Fi network**.
3.  Start the Expo development server:

```bash
npx expo start
```
4.  Scan the QR code that appears in the terminal using the Expo Go app on your phone.

### Test Credentials

Use these credentials from `db.json` to test the different user roles:

-   **Customer Login**:
    -   Phone: `9876543210`
-   **Partner Login**:
    -   Phone: `1234567890`
-   **Mock OTP (for all logins)**: `123456`
