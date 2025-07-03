
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
[(https://www.youtube.com/shorts/rpkcosTQmho)]



**Example:**
| Login Screen | Customer Dashboard | Partner Pickups |
| :---: |:---:|:---:|
| *(![WhatsApp Image 2025-07-03 at 20 54 18_ae679839](https://github.com/user-attachments/assets/71407b33-dc37-41d0-9ab6-a8d38457477d)
  ![WhatsApp Image 2025-07-03 at 20 54 21_8a356ad2](https://github.com/user-attachments/assets/4e11fdeb-37b1-46de-92c9-ca1658c40075))*

 | *(![WhatsApp Image 2025-07-03 at 20 54 13_1b0f66e9](https://github.com/user-attachments/assets/61b1a0f0-28fe-4af1-99e4-1ba77a68f708)
   ![WhatsApp Image 2025-07-03 at 20 54 14_ead697e9](https://github.com/user-attachments/assets/063f516b-4add-437b-b5f7-f7d4f8c14704)
   ![WhatsApp Image 2025-07-03 at 20 54 15_dfb4abe9](https://github.com/user-attachments/assets/10d9c428-c2b1-4903-b92d-ba8c79be83ee)
   ![WhatsApp Image 2025-07-03 at 20 57 18_f81243a3](https://github.com/user-attachments/assets/b2f67b19-cdfa-4991-a4bb-34186161b16b)
   ![WhatsApp Image 2025-07-03 at 20 57 21_44bdd775](https://github.com/user-attachments/assets/f7951968-9b43-4117-8fdd-e7d059a93d38)
   ![WhatsApp Image 2025-07-03 at 20 57 22_a3651339](https://github.com/user-attachments/assets/09e05fd8-58e1-4bda-91f9-785f8bad1b20)
   ![WhatsApp Image 2025-07-03 at 20 57 22_a4428592](https://github.com/user-attachments/assets/dae6b6cd-087f-4f5c-a20a-4c648e60bd3b))*

 | *(![WhatsApp Image 2025-07-03 at 20 56 39_125bb8cf](https://github.com/user-attachments/assets/04a80c13-0df2-4733-89df-4d98e9595058)
     ![WhatsApp Image 2025-07-03 at 20 57 20_be0369b7](https://github.com/user-attachments/assets/2584c79a-68ef-4bfb-a306-fc323b53edd6)
     ![WhatsApp Image 2025-07-03 at 20 57 21_1034d451](https://github.com/user-attachments/assets/923c093f-ca3b-4b50-ad67-480d4ca13ebc)
     ![WhatsApp Image 2025-07-03 at 20 57 23_d191538e](https://github.com/user-attachments/assets/c73f990d-eb4b-4b67-9ebd-020b064dbbf6))* |


## Tech Stack & Libraries

- **Framework**: React Native (with Expo)
- **Navigation**: React Navigation (Stack Navigator)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Local Storage**: @react-native-async-storage/async-storage
- **UI Components**: @react-native-community/datetimepicker for date selection
- **Mock Backend**: json-server

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
git clone https://github.com/Karanam-manasa/scrap-pickup.git
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
