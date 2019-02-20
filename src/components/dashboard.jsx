import React, { Component } from 'react';
import { connect } from 'react-redux';
import AssignmentList from './assignments/AssignmentList';
import RateAssignment from './assignments/RateAssignment';
import CreateCourse from './assignments/CreateCourse';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Selection from './assignments/Selection';

class Dashboard extends Component {
	render() {
		const { courses, assignments, auth } = this.props;
		return (
			<div className='dashboard container'>
				<div className='row'>
					<div className='col s12 m6'>
						<h1>Dashboard</h1>
						<AssignmentList assignments={assignments} />
						<RateAssignment />
						<CreateCourse />
						<Selection />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		courses: state.firestore.ordered.courses,
		assignments: state.firestore.ordered.assignments,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'courses' }, { collection: 'assignments' }])
)(Dashboard);
