import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';


const firebaseConfig = {

apiKey: "AIzaSyBAXMkkb2xGtynfzeEyQePKdM1jTbWrU1g",
authDomain: "reservacanchas-e5b53.firebaseapp.com",
databaseURL: "https://reservacanchas-e5b53.firebaseio.com",
projectId: "reservacanchas-e5b53",
storageBucket: "reservacanchas-e5b53.appspot.com",
messagingSenderId: "13749121898",
appId: "1:13749121898:web:1ef10394400057f3d52b13",
measurementId: "G-1F39E210GQ"

}
//Inicilizar DB
class Firebase {

    constructor() {
        firebase.initializeApp(firebaseConfig)
        this.auth = firebase.auth()
        this.db = firebase.firestore();
    }




    login = (email, pass) => {
    return this.auth.signInWithEmailAndPassword(email,pass)

    }

    createUser = async (name, user, pass) => {
    await this.auth.createUserWithEmailAndPassword(user,pass)
    return this.auth.currentUser.updateProfile({

        displayName: name
     }) 
    }

     // Métodos de Firestore
  addDoc = async (collection, data) => {
    return this.db.collection(collection).add(data);
  };

  getDoc = async (collection, id) => {
    const doc = await this.db.collection(collection).doc(id).get();
    return { id: doc.id, ...doc.data() };
  };

  updateDoc = async (collection, id, data) => {
    return this.db.collection(collection).doc(id).update(data);
  };

  deleteDoc = async (collection, id) => {
    return this.db.collection(collection).doc(id).delete();
  };

  


    getUser = () => {
        return this.auth.currentUser.displayName
    }

    

}

const firebaseService = new Firebase()

export default firebaseService