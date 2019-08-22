import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/database';
import FirebaseCredentials from '../../private/FirebaseCredentials';

firebase.initializeApp(FirebaseCredentials);

const Firebase = {};

const DB = firebase.firestore();
const DB2 = firebase.database();

let detectedFacesRef = null;

Firebase.unmonitor = () => {
  if (detectedFacesRef) detectedFacesRef.off();
  childAddedRef = null;
};

Firebase.monitor = async (childAdded) => {
  console.log("firebase monitor");
  detectedFacesRef = DB2.ref('detectedFaces/').limitToLast(100);
  detectedFacesRef.on('child_added', (data) => {
    console.log("call childAdded", data);
    childAdded(data);
  });
  // detectedFacesRef.on('child_changed', data => {
  //   console.log("child_changed", data.key, data.val());
  // });
  //
  // detectedFacesRef.on('child_removed', data => {
  //   console.log("child_removed", data.key, data.val());
  // });
}

Firebase.test = async () => {
  // create
  let data = { test: "test1", key: "a" };
  let data2 = { test: "test1", key: "b" };
  let docRef = await DB.collection("characters").add(data);
  let docRef2 = await DB.collection("characters").doc("doc2");
  docRef2.set(data2);
  console.log("added docRef.id", docRef.id);

  // retrieve
  let retrievedDoc = await docRef.get();
  console.log("retrievedDoc", retrievedDoc.data());

  // subscribe
  let query1 = DB.collection("characters").orderBy("key", "desc").startAt(0).endBefore(20);
  let sub1 = query1.onSnapshot(res => {
    let source = res.metadata.hasPendingWrites ? "Local" : "Server";
    res.docs.forEach(doc => {
      console.log(source, "docRef snapshot listener", doc.data());
    });
  });
  let query2 = DB.collection("characters").where("test", "==", "test1").limit(1);
  let sub2 = query2.onSnapshot(res => {
    let source = res.metadata.hasPendingWrites ? "Local" : "Server";
    res.docChanges().forEach(docChange => {
      switch (docChange.type) {
        case "added":
          console.log(source, "added", docChange.doc.data());
          break;
        case "modified":
          console.log(source, "modified", docChange.doc.data());
          break;
        case "removed":
          console.log(source, "removed", docChange.doc.data());
          break;
      }
    });
  });

  // update
  console.log("update1")
  await docRef.set({test2: "test2"});
  console.log("update2")
  await docRef.set({test1: "test1-A"});

  // delete
  await docRef.delete();
  console.log("deleted", docRef.id);
  await docRef2.delete();
  console.log("deleted", docRef2.id);

  // unsubscribe
  sub1();
  sub2();
}

export default Firebase;
