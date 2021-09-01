import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// import * as admin from 'firebase-admin';
import 'firebase/compat/firestore';


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

//const storage = firebase.storage();

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
//export {storage};






export async function CreateNewUser(email,phone) {

    var res = auth.createUserWithEmailAndPassword(email,phone)
    return res;
}

export async function RegisterUser(uid,user) {

    uid.updateProfile({displayName:user.fname+" "+ user.lname})
    await db.collection("waitforapproval").doc(uid.uid).set(user);
    return;
}
export async function DeleteUser(uid) {
    await db.collection("waitforapproval").doc(uid).delete();
    return;
}

export async function CreateUser(user) {

    if(user.type==="testers") {
        await db.collection("researcher").doc(user.uid).set(user)
        await db.collection("manager").doc(user.uid).set(user)
    }
    await  db.collection(user.type).doc(user.uid).set(user)

    await db.collection("waitforapproval").doc(user.email).delete();
    await DeleteUser(user.uid)
    console.log("done the user is ready")
    return true;
}


export async function checkUser() {
    const user =await auth.onAuthStateChanged();
    return user
}

export async function signOut() {
    await auth.signOut();
    return
}







export async function getPathData(path) {
    var researcherData =await (await db.doc(path).get()).data();
    return researcherData;
}



export async function getUser(user) {
    var researcher = await db.collection('researcher').doc(user.uid).get()
    var manager = await db.collection('managers').doc(user.uid).get()
    var wait = await db.collection('waitforapproval').doc(user.uid).get()

    if (wait.exists)
        return 'wait'
    else if (manager.exists)
    {
        return 'Manager'
    }
    else if(researcher.exists)
        return 'Researcher'
    else
        return null
}


