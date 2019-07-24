import firebase from 'firebase'
import '@firebase/firestore';
import FirebaseCredentials from '../../private/FirebaseCredentials';

firebase.initializeApp(FirebaseCredentials);

const Firebase = {};

const DB = firebase.firestore();

Firebase.test = () => {
    return DB.collection("characters").doc("wario").set({
    employment: "plumber",
    outfitColor: "red",
    specialAttack: "fireball"
  });
}

export default Firebase;
