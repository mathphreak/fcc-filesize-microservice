var meter = require('stream-meter');
var dn = require('dev-null');

function SizeCountingStorage() {}

SizeCountingStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  var m = meter();
  file.stream.pipe(m).pipe(dn());
  m.on('error', cb);
  m.on('finish', function () {
    cb(null, {
      size: m.bytes
    });
  });
};

SizeCountingStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  cb(null);
};

module.exports = SizeCountingStorage;
