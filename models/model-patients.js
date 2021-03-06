'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * patient model file
 * autogenerated by mongoose-scaffold-crud
 */

var PatientsSchema = new Schema({
    patient_id: {type : 'String' , maxlength: 8 , trim : true , unique : true, required : true, dropDups: true},
    ssn: {type : 'String' , maxlength: 13 , trim : true , unique : true, required : true, dropDups: true},
    address: 'String',
    firstname: 'String',
    lastname: 'String',
    email: 'String',
    gender: 'String',
    blood_type: 'String',
    tel_number: [{ type: String, min: 9, max: 10 }],
    physical_record: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PhysicalRecord' }],
    medical_record: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }],
    prescription_record: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }]
});

module.exports = mongoose.model('Patient', PatientsSchema);