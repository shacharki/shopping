import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage';

// import * as admin from 'firebase-admin';
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

//const storage = firebase.storage();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage=firebase.storage();
export default firebase;
//export {storage};



export async function GetFormDownload()
{
    const file =  await firebase.storage().refFromURL("gs://rbms-b759b.appspot.com/דוח מדעי.docx").getDownloadURL()
    return file;


}
export async function GetFormDownloadReportsfinancial()
{
    const file =  await firebase.storage().refFromURL("gs://rbms-b759b.appspot.com/דוח כספי.doc").getDownloadURL()
    return file;
}

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

export async function getResearcher(uid) {
    var researcher = await db.collection("researcher").doc(uid);
    return researcher;
}

export async function getResearcherData(uid) {
    var researcherData = await (await db.collection("researcher").doc(uid).get()).data();
    return researcherData;
}

export async function getResearcherFormByDate(uid, date) {
    var ResearcherData = await (await db.collection("researcher").doc(uid).collection("request").doc(date).get()).data();
    return ResearcherData;
}

export async function getPathData(path) {
    var researcherData =await (await db.doc(path).get()).data();
    return researcherData;
}

export async function getResearcherForms(uid) {
    var forms = [];
    var researcherData = await db.collection("researcher").doc(uid).collection("request").get();
    researcherData.docs.forEach(doc=>{
        forms.push(doc.data());
    })
    return forms;
}

export async function CreateNewTeam(team) {
    await  db.collection("Data").doc().set({name:team}).then(()=>{
            alert("המשתמש נוצר בהצלחה")
            return true;
        }
    ).catch((e)=>{
        alert("משהו השתבש המשתמש לא נוצר ")
        return false;
    })

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


export async function getManager(uid) {
    var manager = await db.collection("managers").doc(uid);
    return manager;
}

export async function getManagerData(uid) {
    var managerData = await (await db.collection("managers").doc(uid).get()).data();
    return managerData;
}
