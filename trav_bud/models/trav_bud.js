var Sequelize = require('sequelize')
  , sequelize = new Sequelize('trav_bud', 'ironeagle', '', {
      dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
      port:    5432, // or 5432 (for postgres) else 3306
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var User = sequelize.define('User', {
    /*
    class User:
        name
        nationality
        email
        dob
        gender
        bio
        image
    */
    name: {
        type: Sequelize.STRING,
    },

    nationality: {
        type: Sequelize.STRING,
    },

    email: {
        type: Sequelize.STRING,
    },

    dob: {
        type: Sequelize.DATEONLY,
    },

    gender: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true,
});


var Trip = sequelize.define('Trip', {
    /*
    class Trip:
        start_date
        end_date
        trips: m2o -> LocationTrip
        user: fk -> User
    */
    start_date: {
        type: Sequelize.DATEONLY,
    },

    end_date: {
        type: Sequelize.DATEONLY,
    },

}, {
    freezeTableName: true
});
Trip.belongsTo(User, {'as': 'user'})


var LocationTrip = sequelize.define('LocationTrip', {
    /*
    class LocationTrip:
        start_date
        end_date
        location
    */
    start_date: {
        type: Sequelize.DATEONLY,
    },

    end_date: {
        type: Sequelize.DATEONLY,
    },

    location: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true
});
LocationTrip.belongsTo(Trip, {'as': 'trip'})


var Interest = sequelize.define('Interest', {
    /*
    class Interest:
        name
    */
    name: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true
});


var PreferenceOption = sequelize.define('PreferenceOption', {
    /*
    class PreferenceOption:
        name
    */
    name: {
        type: Sequelize.STRING,
    },

}, {
    freezeTableName: true
});

var Preference = sequelize.define('Preference', {
    /*
    class Preference:
        name
        options: m2o -> PreferenceOption
    */
    name: {
        type: Sequelize.STRING,
    },
    options: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },

}, {
    freezeTableName: true
});


var UserInterest = sequelize.define('UserInterest', {
    /*
    class UserInterest:
        interest: fk -> Interest
        user: fk -> User
    */

}, {
    freezeTableName: true
});
UserInterest.belongsTo(User, {'as': 'user'})
UserInterest.belongsTo(Interest, {'as': 'interest'})


var TripInterest = sequelize.define('TripInterest', {
    /*
    class TripInterest:
        preference: fk -> Interest
        trip: fk -> Trip
    */

}, {
    freezeTableName: true
});
TripInterest.belongsTo(Trip, {'as': 'trip'})
TripInterest.belongsTo(Interest, {'as': 'interest'})


var UserPreference = sequelize.define('UserPreference', {
    /*
    class UserPreference:
        preference: fk -> Preference
        selected options: m2o -> PreferenceOption
        user: fk -> User
    */
    selected_options: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },

}, {
    freezeTableName: true
});
UserPreference.belongsTo(User, {'as': 'user'})
UserPreference.belongsTo(Preference, {'as': 'user_preference'})


var TripPreference = sequelize.define('TripPreference', {
    /*
    class TripPreference:
        preference: fk -> Preference
        selected: m2o -> PreferenceOption
        trip: fk -> Trip
    */
    selected_options: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
    },

}, {
    freezeTableName: true
});
TripPreference.belongsTo(Trip, {'as': 'trip'})
TripPreference.belongsTo(Preference, {'as': 'trip_preference'})


var Match = sequelize.define('Match', {
    /*
    class Match:
        requester: fk -> User
        requestee: fk -> User
        matched: bool
    */
    matched: {
        type: Sequelize.BOOLEAN,
    },

}, {
    freezeTableName: true
});

TripPreference.belongsTo(User, {'as': 'requester'})
TripPreference.belongsTo(User, {'as': 'requestee'})

//sequelize.sync(force=true);
sequelize.sync();

module.exports = function(sequelize, DataTypes) {

    return {User: User, LocationTrip: LocationTrip, Trip: Trip, Interest: Interest, Preference: Preference, PreferenceOption: PreferenceOption, UserInterest: UserInterest, TripInterest: TripInterest, UserPreference: UserPreference, TripPreference: TripPreference, Match: Match};
};
