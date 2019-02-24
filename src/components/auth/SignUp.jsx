import React, { Component } from 'react';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class SignUp extends Component {
	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault(); //Prevents submitting with nothing
		this.props.signUp(this.state);
	};

	render() {
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='white'>
					<h5 className='grey-text text-darken-3'>Register</h5>
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
							Register
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signUp: newUser => dispatch(signUp(newUser))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp);
