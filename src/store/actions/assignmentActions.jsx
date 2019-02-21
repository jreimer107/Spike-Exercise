export const createCourse = course => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		const firestore = getFirestore();
		firestore
			.collection('courses')
			.add({
				...course,
				createdAt: new Date()
			})
			.then(() => {
				dispatch({ type: 'CREATE_COURSE', course });
			})
			.catch(err => {
				dispatch({
					type: 'CREATE_COURSE_ERROR',
					err
				});
			});
	};
};

export const createAssignment = assignment => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		const firestore = getFirestore();
		firestore
			.collection('assignments')
			.add({
				...assignment,
				createdAt: new Date()
			})
			.then(() => {
				dispatch({ type: 'CREATE_ASSIGNEMENT', assignment });
			})
			.catch(err => {
				dispatch({
					type: 'CREATE_ASSIGNMENT_ERROR',
					err
				});
			});
	};
};

export const switchDisplayedCourse = displayedCourse => {
	return (dispatch, getState) => {
		dispatch({
			type: 'SWITCH_DISPLAYED_COURSE',
			displayedCourse
		});
	};
};

export const switchDisplayedAssignment = displayedAssignment => {
	return (dispatch, getState) => {
		dispatch({
			type: 'SWITCH_DISPLAYED_ASSIGNMENT',
			displayedAssignment
		});
	};
};

export const changeRating = rating => {
	return (dispatch, getstate) => {
		dispatch({
			type: 'CHANGE_RATING',
			rating
		});
	};
};

export const rateAssignment = displayedAssignment => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection('assignments')
			.doc(displayedAssignment)
			.update({
				//put code to update count and average
			});
	};
};