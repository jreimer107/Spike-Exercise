import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import { getFirestore } from 'redux-firestore';

class CourseComments extends Component {
	submitComment = comment => {
		const firestore = getFirestore();
		firestore.collection('comments').add({
			content: comment,
			ownerID: this.props.displayedCourse.id
		});
	};

	render() {
		const { comments, displayedCourse, auth } = this.props;
		console.log('course changed', displayedCourse);
		return (
			<div className='container'>
				<h5>Course Comments</h5>
				{comments &&
					comments
						.filter(x => x.ownerID === displayedCourse.id)
						.map(comment => {
							return <p key={comment.id}>{comment.content}</p>;
						})}
				{displayedCourse && auth.uid ? (
					<CommentForm submitComment={this.submitComment} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		comments: state.firestore.ordered.comments,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'comments' }])
)(CourseComments);
