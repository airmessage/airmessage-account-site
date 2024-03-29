import { initializeApp } from "firebase/app";
import {deleteUser, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential} from "firebase/auth";
import firebaseConfig from "../firebase-config.json";

async function signIn() {
    //Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: "select_account"
    });
    
    //Get the user 
    let userCredential: UserCredential;
    try {
        userCredential = await signInWithPopup(auth, provider);
    } catch (e) {
        console.error(e);
        return;
    }
    
    console.log(`Signed in as ${userCredential.user.email}`);

    //Delete the user
    try {
        await deleteUser(userCredential.user);
    } catch (e) {
        console.error(e);
        return;
    }
    
    console.log(`Deleted user ${userCredential.user.email}`);
    
    //Disable the button
    const deleteButton = document.getElementById("button-delete") as HTMLButtonElement
    deleteButton.disabled = true;
    
    //Update the text
    const label = document.getElementById("label-delete")!;
    label.textContent = "Your account has been deleted.";
}

// @ts-ignore
window.signIn = signIn;
