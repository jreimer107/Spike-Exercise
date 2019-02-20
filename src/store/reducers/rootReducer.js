import authReducer from './authReducer';
import assignmentReducer from './assignmentReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; //Detects when user is signed out or in
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
	auth: authReducer,
	assignment: assignmentReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
});
export default rootReducer;
