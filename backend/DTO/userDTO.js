class UserDTO{
    constructor(user){
        this._id = user._id;
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
        this.isStadiumOwner = user.isStadiumOwner;
    }
}

module.exports = UserDTO;