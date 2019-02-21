const initState = {
	courses: [],
	assignments: [],
	displayedCourse: '',
	displayedAssignement: ''
};

const assignmentReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_COURSE':
			console.log('created course', action.course);
			return state;
		case 'CREATE_COURSE_ERROR':
			console.log('create course error', action.err);
			return state;
		case 'CREATE_ASSIGNMENT':
			console.log('created assignment', action.course);
			return state;
		case 'CREATE_ASSIGNMENT_ERROR':
			console.log('create assignment error', action.err);
			return state;
		case 'SWITCH_DISPLAYED_COURSE':
			return {
				...state,
				displayedCourse: action.displayedCourse
			};
		case 'SWITCH_DISPLAYED_ASSIGNMENT':
			return {
				...state,
				displayedAssignment: action.displayedAssignment
			};
		case 'CHANGE_RATING':
			return {
				...state,
				rating: action.rating
			};
		default:
			return state;
	}
};
export default assignmentReducer;
