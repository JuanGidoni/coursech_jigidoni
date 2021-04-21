import firebase from 'firebase/app'
import 'firebase/firestore'

const app = firebase.initializeApp({
        apiKey: process.env.REACT_APP_apiKey,
        authDomain: process.env.REACT_APP_authDomain,
        projectId: process.env.REACT_APP_projectId,
        storageBucket: process.env.REACT_APP_storageBucket,
        messagingSenderId: process.env.REACT_APP_messagingSenderId,
        appId: process.env.REACT_APP_appId
})
export const getFirebase = () => app
export const getFirestore = firebase.firestore(app)

export default app