export const createAssignment = assignment => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to database
		dispatch({ type: 'CREATE_ASSIGNMENT', assignment });
	};
};

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

export const rateAssignment = {};
