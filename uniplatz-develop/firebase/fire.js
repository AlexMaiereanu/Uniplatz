import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCgyFF9ZtoQL7PV5VMXRpNj2Cy5wY5d9jA",
    authDomain: "jacobs-store-4-play.firebaseapp.com",
    databaseURL: "https://jacobs-store-4-play.firebaseio.com",
    projectId: "jacobs-store-4-play",
    storageBucket: "jacobs-store-4-play.appspot.com",
    messagingSenderId: "2944415802"
};
const fire = firebase.initializeApp(config);

export default fire;
export const storage = firebase.storage();
export const auth = firebase.auth();
export const db = firebase.database();
