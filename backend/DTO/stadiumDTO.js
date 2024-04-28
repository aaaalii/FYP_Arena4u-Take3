class stadiumDTO{
    constructor(stadium){
        this.name = stadium.name;
        this._id = stadium._id;
        this.ownerId = stadium.ownerId;
        this.location = stadium.location;
        this.features = stadium.features;
    }
}

module.exports = stadiumDTO;