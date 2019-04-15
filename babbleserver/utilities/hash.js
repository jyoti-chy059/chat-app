'use strict';
const bcrypt = require('bcrypt');

class Hash{

	getHash(password) {
		return bcrypt.hashSync(password, 10);
	}

	evaluateHash(password, hash) {
		return bcrypt.compareSync(password, hash)
	}
}

module.exports = new Hash();