import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ownerAuthentication } from '../reducers'
import { ownerService } from '../services'
import { ownerActions } from '../actions'
import { ownerLoginSuccess, ownerLoginFailure } from '../actions/owner-actions';
import { history } from '../helpers';
import axios from 'axios';
import Jumbotron from "../components/Jumbotron";
import background from "./background.jpg";
import './Login.css';

class OwnerLoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(ownerActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/owner/authenticate')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log([name]);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        const owner = {
            email: email,
            password: password
        }
        if (email && password) {
            ownerService.login(owner).then(response => {
                console.log(response);
                console.log(response.statusText);
                if (response.statusText === "OK") {
                    dispatch(ownerLoginSuccess(response.data))
                    localStorage.setItem("owner", response.data.ownerID);
                    //   dispatch(loginSuccess(owner))
                    // localStorage.setItem("owner", owner);
                    history.push('/ownerHomePage')
                } else {
                    dispatch(ownerLoginFailure())
                    this.setState({
                        email: '',
                        password: '',
                        submitted: false

                    })
                }
            })
            // dispatch(ownerActions.login(email, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div>
             <img src={background} className="background-img"/>
                <Jumbotron >
                    <div class="row justify-content-md-center">
                        <div className="col-md-3">
                            <h2>Login</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                    {submitted && !email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Login</button>
                                    <Link to="/register/owner" className="btn btn-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.ownerAuthentication;
    return {
        loggingIn
    };
}

const connectedownerLoginPage = connect(mapStateToProps)(OwnerLoginPage);
export { connectedownerLoginPage as OwnerLoginPage };
