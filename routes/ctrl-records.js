'use strict';

 /**
 * physicalrecord controller file * autogenerated by mongoose-scaffold-crud **/
var express = require('express');
var router = express.Router();
module.exports = router;

//  creating a GET route for retrieving posts
var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');
var PhysicalRecord = mongoose.model('PhysicalRecord');

// Get form to create new Physical Record
router.get('/physical/create/:patid', function(req, res, next) {
    res.render('records/physical/edit' , { patient_id: req.params.patid});
});

// Get form to create new Medical Record
router.get('/medical/create/:patid', function(req, res, next) {
    res.render('records/medical/edit' , { patient_id: req.params.patid});
});

// Insert new Physical Record
router.post('/physical/insert/:patient', function(req, res, next) {
  var physicalRecord = new PhysicalRecord(req.body);
  physicalRecord.save(function(err, physicalRecord){
    if(err){ return next(err); }
    req.patient.physical_record.push(physicalRecord._id);
    req.patient.save(function(err, patient) {
      if(err){ return next(err); }
      res.json(physicalRecord);
    });
  });
});

// Insert new Medical Record
router.post('/medical/insert/:patient', function(req, res, next) {
 // Do Something....
 /* var physicalRecord = new PhysicalRecord(req.body);
  physicalRecord.save(function(err, physicalRecord){
    if(err){ return next(err); }
    req.patient.physical_record.push(physicalRecord._id);
    req.patient.save(function(err, patient) {
      if(err){ return next(err); }
      res.json(physicalRecord);
    });
  });*/
});

// Get form to edit the Physical Record
router.get('/physical/edit/:physid', function(req, res, next) {
    res.render('records/physical/edit' , { _id: req.params.:physid});
});

// Get form to edit the Medical Record
router.get('/medical/edit/::medid', function(req, res, next) {
    res.render('records/medical/edit' , { _id: req.params.:medid});
});

// Update the Physical Record
router.put('/physical/update/:physid', function(req, res, next) {
    var id = req.params.physid;
    PhysicalRecord.findOne({_id: id}, function(err, physicalrecord){
        if(err) {
            return res.send('500: Internal Server Error', 500);
        }
        if(!physicalrecord) {
            return res.end('No such Physical Record');
        }
        // Check If there are exist field.
        physicalrecord['weight'] = req.body['weight'] ? req.body['weight'] : physicalrecord['weight'];
        physicalrecord['height'] = req.body['height'] ? req.body['height'] : physicalrecord['height'];
        physicalrecord['blood_pressure'] = req.body['blood_pressure'] ? req.body['blood_pressure'] : physicalrecord['blood_pressure'];
        physicalrecord['pulse'] = req.body['pulse'] ? req.body['pulse'] : physicalrecord['pulse'];
        physicalrecord['temperature'] = req.body['temperature'] ? req.body['temperature'] : physicalrecord['temperature'];
        physicalrecord.save(function(err, physicalrecord){
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!physicalrecord) {
                return res.end('No such No such Physical Record');
            }
            return res.render('records/physical/edit', {physicalrecord: physicalrecord, flash: 'Saved.'});
        });
    });
});

// Update the Medical Record
router.put('/medical/update/:medid', function(req, res, next) {
    // Do Something..
});

// Delete the Physical Record
router.delete('/physical/delete/:pid/:physid', function(req, res, next) {
    var id = req.params.physid;
    Patient.findOne.findOne({_id: id}, function(err, patient){
        //remove physical id from patient's array
        PhysicalRecord.findOne({_id: id}, function(err, physicalrecord){
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!physicalrecord) {
                return res.end('No such physicalrecord');
            }
            return res.render('index', {flash: 'Item deleted.'});
        });
    });
});
// Delete the Medical Record
router.delete('/medical/delete/:pid/:physid', function(req, res, next) {
    // Do Something..
});
router.param('patient', function(req, res, next, id) {
  var query = Patient.findById(id);

  query.exec(function (err, patient){
    if (err) { return next(err); }
    if (!patient) { return next(new Error('can\'t find post')); }
    req.patient = patient;
    return next();
  });
});
/*
records.post('/', function(req, res) {
    var physicalrecord = new Model({
        // TODO: generate Date parser.,
        'weight': req.body['weight'],
        'height': req.body['height'],
        'blood_pressure': req.body['blood_pressure'],
        'pulse:': req.body['pulse:'],
        'temperature': req.body['temperature']
    });
    physicalrecord.save(function(err, physicalrecord){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving item.',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: physicalrecord._id
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('physicalrecords/edit', {physicalrecord: physicalrecord});
        }
    });
});

records.get('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, physicalrecord){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting physicalrecord.'
                });
            }
            if(!physicalrecord) {
                return res.json(404, {
                    message: 'No such physicalrecord.'
                });
            }
            return res.json(physicalrecord);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!physicalrecord) {
                return res.end('No such physicalrecord');
            }
            return res.render('physicalrecords/edit', {physicalrecord: physicalrecord, flash: 'Created.'});
        }
    });
});

records.put('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, physicalrecord){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving physicalrecord',
                    error: err
                });
            }
            if(!physicalrecord) {
                return res.json(404, {
                    message: 'No such physicalrecord'
                });
            }
            // TODO: generate Date parser.
            physicalrecord['weight'] = req.body['weight'] ? req.body['weight'] : physicalrecord['weight'];
            physicalrecord['height'] = req.body['height'] ? req.body['height'] : physicalrecord['height'];
            physicalrecord['blood_pressure'] = req.body['blood_pressure'] ? req.body['blood_pressure'] : physicalrecord['blood_pressure'];
            physicalrecord['pulse:'] = req.body['pulse:'] ? req.body['pulse:'] : physicalrecord['pulse:'];
            physicalrecord['temperature'] = req.body['temperature'] ? req.body['temperature'] : physicalrecord['temperature'];
            physicalrecord.save(function(err, physicalrecord){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting physicalrecord.'
                    });
                }
                if(!physicalrecord) {
                    return res.json(404, {
                        message: 'No such physicalrecord'
                    });
                }
                return res.json(physicalrecord);
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!physicalrecord) {
                return res.end('No such physicalrecord');
            }
            // TODO: generate Date parser.
            physicalrecord['weight'] = req.body['weight'] ? req.body['weight'] : physicalrecord['weight'];
            physicalrecord['height'] = req.body['height'] ? req.body['height'] : physicalrecord['height'];
            physicalrecord['blood_pressure'] = req.body['blood_pressure'] ? req.body['blood_pressure'] : physicalrecord['blood_pressure'];
            physicalrecord['pulse:'] = req.body['pulse:'] ? req.body['pulse:'] : physicalrecord['pulse:'];
            physicalrecord['temperature'] = req.body['temperature'] ? req.body['temperature'] : physicalrecord['temperature'];
            physicalrecord.save(function(err, physicalrecord){
                if(err) {
                    return res.send('500: Internal Server Error', 500);
                }
                if(!physicalrecord) {
                    return res.end('No such physicalrecord');
                }
                return res.render('physicalrecords/edit', {physicalrecord: physicalrecord, flash: 'Saved.'});
            });
        }
    });
});

records.delete('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, physicalrecord){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting physicalrecord.'
                });
            }
            if(!physicalrecord) {
                return res.json(404, {
                    message: 'No such physicalrecord'
                });
            }
            return res.json(physicalrecord);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!physicalrecord) {
                return res.end('No such physicalrecord');
            }
            return res.render('index', {flash: 'Item deleted.'});
        }
    });
});
*/