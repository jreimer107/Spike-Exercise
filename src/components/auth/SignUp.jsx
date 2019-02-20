import React, { Component } from 'react';

class SignUp extends Component {
	state = {
		email: '',
		password: '',
		name: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault(); //Prevents submitting with nothing
		console.log(this.state);
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
						<label htmlFor='Name'>Name</label>
						<input
							type='text'
							id='name'
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

export default SignUp;
