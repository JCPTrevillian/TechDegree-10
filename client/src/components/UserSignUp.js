import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        'firstName': '',
        'lastName': '',
        'emailAddress': '',
        'password': '',
        'confirmPassword': '',
        'errors': [],
    }
    // user info state
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <div>
                                    <input 
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        className=""
                                        value={firstName}
                                        onChange={this.change}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className=""
                                        value={lastName}
                                        onChange={this.change}
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        className=""
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        className=""
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password"
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className=""
                                        value={confirmPassword}
                                        onChange={this.change}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    />
                    <p>&nbsp;</p>
                    <p>Do you have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name] : value
            };
        });
    }
    
    submit = () => {

        //state props
        const { context } = this.props;

        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        // new user 
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };
        
        this.setState({
            errors: [],
        })

        context.data.createUser(user)
        .then(errors => {
            if(this.state.password !== this.state.confirmPassword){
                this.setState({
                    errors: [ ...this.state.errors ,"Passwords don't match!"]
                })
            }
            if (errors.length) {
                this.setState({ 
                    errors: [ ...this.state.errors, ...errors]
                });
            }
            else {
                // user in, redirect main page
                context.actions.signIn(emailAddress, password)
                .then(() => {
                    this.props.history.push('/');
                })
            }
        })
        .catch( err => {
            console.log(err);
            this.props.history.push('/error');
        })

    }

    cancel = () => {
        this.props.history.push('/');
    }
}