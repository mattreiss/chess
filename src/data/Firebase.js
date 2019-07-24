import firebase from 'firebase'
import '@firebase/firestore';
import FirebaseConfig from '../../config/FirebaseConfig';

firebase.initializeApp(FirebaseConfig);

const Firebase = {};

const DB = firebase.firestore();

Firebase.test = () => {
    return DB.collection("characters").doc("luigi").set({
    employment: "plumber",
    outfitColor: "red",
    specialAttack: "fireball"
  });
}

export default Firebase;
