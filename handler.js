'use strict';

const connectToDatabase = require('./db');
const Users = require('./Users');
require('dotenv').config({ path: '.env' });

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Users.create(JSON.parse(event.body))
        .then(Users => callback(null, {
          statusCode: 200,
          body: JSON.stringify(Users)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Gagal membuat user baru.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Users.findById(event.pathParameters.id)
        .then(Users => callback(null, {
          statusCode: 200,
          body: JSON.stringify(Users)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Gagal mendapatkan data.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Users.find()
        .then(Userss => callback(null, {
          statusCode: 200,
          body: JSON.stringify(Userss)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Gagal mendapatkan data.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Users.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(Users => callback(null, {
          statusCode: 200,
          body: JSON.stringify(Users)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Gagal untuk update users.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Users.findByIdAndRemove(event.pathParameters.id)
        .then(Users => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Berhasil menghapus data user dengan id: ' + Users._id, Users: Users })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Data user tidak berhasil di hapus.'
        }));
    });
};