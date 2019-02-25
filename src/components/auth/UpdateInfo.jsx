import React, { Component } from 'react';
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

class UpdateInfo extends Component {
	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		authError: '',
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault(); //Prevents submitting with nothing
		const { email, password, firstName, lastName } = this.state;
		let { profile, auth } = this.props;

		const firebase = getFirebase();
		const firestore = getFirestore();
		const user = firebase.auth().currentUser;

		//Update email and password through firebase auth with their own functions
		if (email) {
			user.updateEmail(email)
				.then(console.log('updated email'))
				.catch(err =>
					this.setState({
						authError: err,
					}),
				);
		}

		if (password) {
			user.updatePassword(password)
				.then(console.log('updated password'))
				.catch(err =>
					this.setState({
						authError: err,
					}),
				);
		}

		//Update other info manually through users collection
		if (firstName) {
			profile.firstName = firstName;
		}

		if (lastName) {
			profile.lastName = lastName;
		}

		if (profile.firstName && profile.lastName)
			profile.initials = profile.firstName[0] + profile.lastName[0];

		if (firstName || lastName) {
			firestore
				.collection('users')
				.doc(auth.uid)
				.update({
					...profile,
				})
				.then(console.log('name updated'))
				.catch(err =>
					this.setState({
						authError: err,
					}),
				);
		}
	};

	render() {
		if (!this.props.auth.uid) return <Redirect to='/signin' />;

		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='white'>
					<h5 className='grey-text text-darken-3'>
						Update Profile Info
					</h5>
					<div className='input-field'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							onChange={this.handleChange}
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							onChange={this.handleChange}
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='FirstName'>First Name</label>
						<input
							type='text'
							id='firstName'
							onChange={this.handleChange}
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='LastName'>Last Name</label>
						<input
							type='text'
							id='lastName'
							onChange={this.handleChange}
						/>
					</div>
					<div className='input-field'>
						<button className='btn green lighten-1 z-depth-0'>
							Update
						</button>
					</div>
					<div className='red-text center'>
						{this.state.authError ? (
							<p>{this.state.authError.message}</p>
						) : null}
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps)(UpdateInfo);
