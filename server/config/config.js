//===========
// Puerto
//===========


process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlBD;


if (process.env.NODE_ENV === 'env') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.NODE_ENV.MONGO_URI;
}


process.env.urlBD = urlBD;