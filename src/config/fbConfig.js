import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
const config = {
	apiKey: 'AIzaSyA1Amh0muFpMD51UW3Yf-nusTp_hMTVtLU',
	authDomain: 'spike-exercise.firebaseapp.com',
	databaseURL: 'https://spike-exercise.firebaseio.com',
	projectId: 'spike-exercise',
	storageBucket: 'spike-exercise.appspot.com',
	messagingSenderId: '256144891962'
};
firebase.initializeApp(config);
//firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
