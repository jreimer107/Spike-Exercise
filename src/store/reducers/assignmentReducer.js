const initState = {
	assignments: [{ id: '1', title: 'example', content: 'example' }]
};

const assignmentReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_COURSE':
			console.log('created course', action.course);
			return state;
		case 'CREATE_COURSE_ERROR':
			console.log('create course error', action.err);
			return state;
		default:
			return state;
	}
};
export default assignmentReducer;
