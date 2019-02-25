import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import CommentForm from './CommentForm';
import { getFirestore } from 'redux-firestore';

class AssignmentComments extends Component {
	submitComment = comment => {
		const firestore = getFirestore();
		firestore.collection('comments').add({
			content: comment,
			ownerID: this.props.displayedAssignment.id,
		});
	};

	render() {
		const { comments, displayedAssignment, auth } = this.props;
		return (
			<div className='container'>
				<h5>Assignment Comments</h5>
				{comments &&
					comments
						.filter(x => x.ownerID === displayedAssignment.id)
						.map(comment => {
							return <p key={comment.id}>{comment.content}</p>;
						})}
				{displayedAssignment && auth.uid ? (
					<CommentForm submitComment={this.submitComment} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		displayedAssignment: state.assignment.displayedAssignment,
		comments: state.firestore.ordered.comments,
		auth: state.firebase.auth,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: 'comments' }]),
)(AssignmentComments);
