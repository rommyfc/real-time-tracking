# Real-time Tracking

This is a real-time location tracking application built with Node.js, Express, Socket.IO, and Leaflet.js. It allows users to share their location in real-time and view the locations of other connected users on a map.

## Features

- Real-time location tracking
- Custom location setting
- Interactive map interface
- Multiple user support

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm

## Installing Real-time Location Tracker

To install the Real-time Location Tracker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/swarajpanmand/realTimeTracking
    ```
2. Navigate to the project directory:
   ```bash
   cd real-time-tracking
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Using Real-time Location Tracker

To use the Real-time Location Tracker, follow these steps:

1. Start the server:
  ```bash
   node app.js
  ```
   
3. Open your web browser and go to `http://localhost:3000`

4. Allow the application to access your location when prompted

5. You should see your location on the map

6. To set a custom location, click the "Enable Custom Location" button and then click on the map

7. To manually enter coordinates, click the "Set Custom Coordinates" button

## Configuration

You can modify the port number in the `app.js` file if needed.
