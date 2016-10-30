var records = [
    { id: 1, username: 'admin', password: 'a', displayName: 'Admin', emails: [ { value: 'admin@email.com' } ] }
  , { id: 2, username: 'admin2', password: 'a', displayName: 'Admin2', emails: [ { value: 'admin2@email.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
