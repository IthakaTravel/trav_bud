var models  = require('../models/trav_bud.js')();
var express = require('express');
var router = express.Router();


addUserDetails = (function(request_data){
    /*
    request_data:
        name
        nationality
        email
        dob
        gender
        bio
    */
    models.User.create({
        name: request_data['name'],
        nationality: request_data['nationality'],
        email: request_data['email'],
        gender: request_data['gender'],
        bio: request_data['bio'],
    }).then(function(newObj){});
});

addUserPreference = (function(request_data){
    /*
    request_data:
        user_id: fk to User creating the trip
        preferences:
            [
                id: preference id
                options: [selected option id]
            ]
    */
    request_data['preferences'] = eval(request_data['preferences'])
    for(i in request_data['preferences']){
        models.UserPreference.create({
            userId: request_data['user_id'],
            preferenceId: request_data['preferences'][i]['id'],
            selected_options: request_data['preferences'][i]['options'],
        }).then(function(newObj){});
    }
});

addTripPreference = (function(request_data){
    /*
    request_data:
        trip_id: fk to Trip creating the trip
        preferences:
            [
                id: preference id
                options: [selected option id]
            ]
    */
    request_data['preferences'] = eval(request_data['preferences'])
    for(i in request_data['preferences']){
        models.TripPreference.create({
            tripId: request_data['trip_id'],
            preferenceId: request_data['preferences'][i]['id'],
            selected_options: request_data['preferences'][i]['options'],
        }).then(function(newObj){});
    }
});

addTripInterest = (function(request_data){
    /*
    request_data:
        trip_id: fk to Trip creating the trip
        interests:
            [
                id: interest id
            ]
    */
    request_data['interests'] = eval(request_data['interests'])
    for(i in request_data['interests']){
        models.TripInterest.create({
            tripId: request_data['trip_id'],
            interestId: request_data['interests'][i]['id'],
        }).then(function(newObj){});
    }
});

addTrip = (function(request_data, callback){
    /*
    request_data:
        user_id: fk to User creating the trip
    */
    models.Trip.create({
        userId: request_data['user_id'],
    }).then(function(newObj){ callback(newObj); });
});

addLocationTrip = (function(request_data, callback){
    /*
    request_data:
        trip_id: fk to trip in which location trip is being added
        location
        start_date
        end_date
    */
    gTrip = ''
    models.Trip.findOne({
        where: {id: request_data['trip_id']}
    }).then(function(trip){
        gTrip = trip;
        return models.LocationTrip.create({
            location: request_data['location'],
            tripId: request_data['trip_id']
        })
    }).then(function(newObj){ callback(newObj, gTrip); });
});

//GROT
getAllInterests = (function(callback){
    interests = new Array()
    models.Interest.findAll({}).then(function(objs){
        for(i in objs){ interests.push(objs[i]); }
        callback(interests);
    })
})

//GROT
getAllPreferences = (function(callback){
    preferences = new Array()
    models.Preference.findAll({}).then(function(objs){
        for(i in objs){ preferences.push(objs[i]); }
        callback(preferences);
    })
})

getAllLocationTrips = (function(trip_id, callback){
    location_trips = new Array()
    models.LocationTrip.findAll({where: {tripId: trip_id}}).then(function(objs){
        for(i in objs){ location_trips.push(objs[i]); }
        callback(location_trips);
    })
})



// USER APIs - START //
router.post('/api/user/add/details/', function(req, res, next) {
    addUserDetails(req.body);
    res.json({'success': true});
});

router.get('/api/user/get/details/', function(req, res, next) {
    models.User.findOne({where: {id: req.query['id']}}).then(function(user){
        res.setHeader('Content-Type', 'application/json');
        res.json({'success': true, 'user': user});
    });
});

router.post('/api/user/add/preference/', function(req, res, next) {
    addUserPreference(req.body);
    res.json({'success': true});
});

router.get('/api/user/get/preference/', function(req, res, next) {
    models.UserPreference.findAll({where: {userId: req.query['id']}}).then(function(user_preferences){
        res.setHeader('Content-Type', 'application/json');
        res.json({'success': true, 'user_preferences': user_preferences});
    });
});

//TODO - not required right now
router.post('/api/user/add/interest/', function(req, res, next) {
    res.json({'success': true});
});

//not required right now
router.get('/api/user/get/interest/', function(req, res, next) {
    models.UserInterest.findAll({where: {userId: req.query['userId']}}).then(function(user_interests){
        res.setHeader('Content-Type', 'application/json');
        res.json({'success': true, 'user_interests': user_interests});
    });
});

//TODO
router.post('/api/user/get/compatible/', function(req, res, next) {
    res.json({'success': true});
});

//TODO
router.post('/api/user/send_request/', function(req, res, next) {
    res.json({'success': true});
});

//TODO
router.post('/api/user/accept_request/', function(req, res, next) {
    res.json({'success': true});
});

//TODO
router.post('/api/user/chat/', function(req, res, next) {
    res.json({'success': true});
});
// USER APIs - END //



// TRIP APIs - START //
router.post('/api/trip/add/', function(req, res, next) {
    req_data = req.body
    addTrip(req_data, function(trip){
        res.json({'success': true, 'trip': trip});
    });
});

router.post('/api/trip/get/', function(req, res, next) {
    models.Trip.findOne({where: {id: req.query['id']}}).then(function(trip){
        res.setHeader('Content-Type', 'application/json');
        res.json({'success': true, 'trip': trip});
    });
});

router.get('/api/trip/get/locations/', function(req, res, next) {
    trip_id = req.query['id']
    console.log(trip_id)
    getAllLocationTrips(trip_id, function(location_trips){
        console.log('location trips found')
        console.log(location_trips.length)
        res.json({'success': true, 'location_trips': location_trips});
    });
});

router.post('/api/trip/add/location/', function(req, res, next) {
    req_data = req.body
    addLocationTrip(req_data, function(location_trip, trip){
        res.json({'success': true, 'location_trip': location_trip, 'trip': trip});
    });
});

router.post('/api/trip/add/preference/', function(req, res, next) {
    addTripPreference(req.body);
    res.json({'success': true});
});

router.post('/api/trip/add/interest/', function(req, res, next) {
    addTripInterest(req.body);
    res.json({'success': true});
});
// TRIP APIs - END //



// INTEREST APIs - START //
router.get('/api/interest/all/', function(req, res, next) {
    getAllInterests(function (interests){
        res.json({'success': true, 'interests': interests});
    });
});

router.get('/api/interest/', function(req, res, next) {
    models.Interest.findOne({where: {id: req.query['id']}}).then(function(interest){
        res.json({'success': true, 'interest': interest});
    });
});
// INTEREST APIs - END //



// PREFERENCE APIs - START //
router.get('/api/preference/all/', function(req, res, next) {
    getAllPreferences(function (preferences){
        res.json({'success': true, 'preferences': preferences});
    });
});

router.get('/api/preference/', function(req, res, next) {
    models.Preference.findOne({where: {id: req.query['id']}}).then(function(preference){
        res.json({'success': true, 'preference': preference});
    });
});

router.get('/api/preference/option/', function(req, res, next) {
    models.PreferenceOption.findOne({where: {id: req.query['id']}}).then(function(preferenceOption){
        res.json({'success': true, 'preferenceOption': preferenceOption});
    });
});
// PREFERENCE APIs - END //



module.exports = router;
