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
		return (
			<div className='container'>
				<h5>Course Comments</h5>
				{this.props.comments &&
					this.props.comments
						.filter(
							x => x.ownerID === this.props.displayedCourse.id
						)
						.map(comment => {
							console.log('mapped comment', comment);
							return <p key={comment.id}>{comment.content}</p>;
						})}
				{this.props.displayedCourse ? (
					<CommentForm submitComment={this.submitComment} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedCourse: state.assignment.displayedCourse,
		comments: state.firestore.ordered.comments
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'comments' }])
)(CourseComments);
