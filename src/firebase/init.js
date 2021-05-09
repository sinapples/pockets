import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyB7Gq2fVmPbm47XDmfyDtzDh4P2U12PADc',
  authDomain: 'pockets-check.firebaseapp.com',
  projectId: 'pockets-check',
  storageBucket: 'pockets-check.appspot.com',
  messagingSenderId: '965408043147',
  appId: '1:965408043147:web:caa8a990f8d5e4b2f3a48e',
  measurementId: 'G-VWRNCEBZMJ'
}

firebase.initializeApp(config)
