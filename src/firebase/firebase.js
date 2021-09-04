import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBWB222MRcOey_ddHCFlsJ_9wjLtHTH58E",
    authDomain: "shopping-2a4b8.firebaseapp.com",
    projectId: "shopping-2a4b8",
    storageBucket: "shopping-2a4b8.appspot.com",
    messagingSenderId: "979724217726",
    appId: "1:979724217726:web:38bb10d9edf42e99ac572f",
    measurementId: "G-9EJCDQBR64"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage=firebase.storage();

export default firebase;


export async function CreateNewUser(email,phone) {

    var res = auth.createUserWithEmailAndPassword(email,phone)
    return res;
}

export async function RegisterUser(uid,user) {

    uid.updateProfile({displayName:user.fname})
    await db.collection("users").doc(user.uid).set(user)
    return;
}


export async function signOut() {
    await auth.signOut();
    return
}



export async function getProduct(uid) {
    var forms = [];
    var ProdData = await db.collection("users").doc(uid).collection("prod").get();
    ProdData.docs.forEach(doc=>{
        forms.push(doc.data());
    })
    return forms;
}



export async function getPathData(path) {
    var PathData =await (await db.doc(path).get()).data();
    return PathData;
}



export async function getUser(user) {
    var user = await db.collection('users').doc(user.uid).get()

    if (user.exists)
        return 'user'
    else
        return null
}


