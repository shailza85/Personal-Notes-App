/**
 * set the value of isLoggedIn (to true or false)
 * @param {boolean} value
 */
const setLoggedIn = (value) => {
    return {
        type: "SET_IS_LOGGED_IN",
        value: value,
    };
};


/**
 * store the current user in redux
 * @param {object} user a user object with id, username.. etc
 */
const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER",
        value: user,
    };
};



/**
 * store the list of users in redux
 * @param {array} listOfUsers a list of users
 */
const updateUsers = (listOfUsers) => {
    return {
        type: "UPDATE_USERS",
        value: listOfUsers,
    };
};


/**
 * log the current user out
 */
const logout = () => {
    return {
        type: "LOGOUT"
    }
}

export {
    updateUsers,
    setLoggedIn,
    setCurrentUser,
    logout
};