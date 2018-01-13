import { driverConstants } from '../constants';
import { driverService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const driverActions = {
   // login,
    logout,
   // register,
    getAll,
    delete: _delete
};
/*
function login(email, password) {
    return dispatch => {
        dispatch(driverLoginRequest({ email }));

        driverService.login(email, password)
            .then(
            driver => {
                dispatch(loginSuccess(driver));
                history.push('/login/driver');
            },
            error => {
                dispatch(loginFailure(error));
                dispatch(alertActions.error(error.messege));
            }
            );
    };

}*/

function logout() {
    driverService.logout();
    return { type: driverConstants.LOGOUT };
}

export const loginSuccess = (driver) => {
    return {
        type: driverConstants.LOGIN_SUCCESS,
        driver
    }
}



export const loginFailure = (driver) => {
    return {
        type: driverConstants.LOGIN_FAILURE,
        driver
    }
}

export const driverRegisterSuccess = (driver) => {
    return {
        type: driverConstants.REGISTER_SUCCESS,
        driver
    }
}

export const driverRegisterFailure = (driver) => {
    return {
        type: driverConstants.REGISTER_FAILURE,
        driver
    }
}
/*
function register(driver) {
    return dispatch => {
        dispatch(request(driver));

        driverService.register(driver)
            .then(
            driver => {
                dispatch(success(driver));
                window.localStorage.setItem('driver', JSON.stringify(driver));
                history.push('/');
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error.message));
            }
            );
    };

    function request(driver) { return { type: driverConstants.REGISTER_REQUEST, driver } }
    function success(driver) { return { type: driverConstants.REGISTER_SUCCESS, driver } }
    function failure(error) { return { type: driverConstants.REGISTER_FAILURE, error } }
}*/

function getAll() {
    return dispatch => {
        dispatch(request());

        driverService.getAll()
            .then(
            drivers => dispatch(success(drivers)),
            error => dispatch(failure(error))
            );
    };

    function request() { return { type: driverConstants.GETALL_REQUEST } }
    function success(drivers) { return { type: driverConstants.GETALL_SUCCESS, drivers } }
    function failure(error) { return { type: driverConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        driverService.delete(id)
            .then(
            driver => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error));
            }
            );
    };

    function request(id) { return { type: driverConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: driverConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: driverConstants.DELETE_FAILURE, id, error } }
} 