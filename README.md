# Breezy Project Manager Task

This document provides instructions on how to set up and run the project, including the backend services and the Expo mobile application.

## Project Structure

This project is a monorepo managed with npm workspaces.

- `packages/backend/`: Contains the backend application code.
- `packages/mobile/`: Contains the Expo mobile application code.

## Before You Begin
1. Install packages:
   ```bash
   npm install
   ```
2. Follow the [instructions on Expo Docs to set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/) in order to run the mobile app.


## Backend

### Installation

1. Navigate to the backend directory:
   ```bash
   cd packages/backend
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Mobile App

### Installation

1. Navigate to the mobile app directory:
   ```bash
   cd packages/mobile
   ```
2. Install dependencies:
   ```bash
   npm run start
   ```
3. Press `i` to run the app on an iOS Simulator, `a` to run on an Android emulator.
