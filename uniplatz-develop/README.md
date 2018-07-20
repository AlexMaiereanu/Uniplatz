# Uniplatz

## Getting started - web

Run `npm install` in the `/web` directory.

Run `yarn start` to open the website in your browser (live).

## Getting started - native

Run `npm install` in the `/native` directory.

Run `react-native run-ios` or `react-native run-android` to run the app on a simulator.

## Modifying firebase queries

All access to firebase goes through the files in the `/firebase` folder. 
(Currently: `fire.js` and `firebaseService.js`).

If you want to modify any of these functions, modify the files in the `/firebase` 
folder and then execute the `/firebase/cmd` file in your terminal. 
This will push the changes into the web and native app. That way, the firebase 
queries will always stay in sync.