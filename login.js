const userRepository = require('./repository/user-repository');
var loggedInId;

module.exports = {
    check: async function () {
       
        return userRepository.findUserById(loggedInId);
    },
    logIn: async function (user, pass) {
        result = await userRepository.findUserByLogin(user, pass);
        if (!result) {
            return 400;
        }
        loggedInId = result.id;
        userRepository.notifyLogin(loggedInId);
    },
    logOff: function () {
        loggedInId = 0;
    }
}