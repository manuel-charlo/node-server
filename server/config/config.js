//===========
// Puerto
//===========


process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlBD;


if (process.env.NODE_ENV === 'env') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb+srv://mcharlo:Garbage13_LYN@cluster0.1u5a1.mongodb.net/cafe'
}


process.env.urlBD = urlBD;