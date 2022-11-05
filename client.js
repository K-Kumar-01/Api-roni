const { Client } = require('pg');
const client = new Client('postgres://rvqqbeir:HYED63AHyvJc1vhjfl2FUMeZdBSXXD6w@lucky.db.elephantsql.com/rvqqbeir');

module.exports = client