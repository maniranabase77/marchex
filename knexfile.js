require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
      // connection: 'postgres://localhost/loren'
	   //connection: 'postgres://postgres:baseline77@localhost:5432/marchexdb'
/* 	   migrations:{
		   directory: __dirname + '/migrations'
	   },	 
	   seeds:{
		   directory: __dirname + '/seeds'
	   } */
	    connection: {
			host : '127.0.0.1',
			user : 'postgres',
			password : 'baseline77',
			database : 'marchexdb'
		  },
        migrations:{
		   directory: __dirname + '/migrations'
	     },	 
	    seeds:{
		   directory: __dirname + '/seeds'
	     }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
