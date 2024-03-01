class stadiumDTO{
    constructor(stadium){
        this.name = stadium.name;
        this._id = stadium._id;
        this.ownerId = stadium.ownerId;
    }
}

module.exports = stadiumDTO;