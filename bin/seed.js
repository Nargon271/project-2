const mongoose = require('mongoose')
const Farm = require('./../models/farm.model')
//DATABASE
const dbName = 'farmproject'
mongoose.connect(`mongodb://localhost/${dbName}`)

//bcriptjs
const bcrypt = require("bcryptjs")
const bcryptSalt = 10

const salt = bcrypt.genSaltSync(bcryptSalt)
const password1 = "granjero"
const hashPass1 = bcrypt.hashSync(password1, salt)

const password2 = "agricultor"
const hashPass2 = bcrypt.hashSync(password2, salt)

const farms = [
    {
        name: "Jose",
        surName: "Coronado",
        farmname: "Riconatura",
        email: "josecorona2@gmail.com",
        username: "josele",
        password: hashPass1,
        description: "Productos locales de calidad, cultivados con todo el cariño y sin fertilizantes ni conservantes. De la huerta a tu casa, con el mayor compromiso por parte de nuestros agricultores y preservando la agricultura como cultura de nuestro pais.",
        role: "FARMER",
        profileImg: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80",
        location: {
            type: 'Point',
            coordinates: [40.36225110439367, -3.545415702780566]
        }
    },
    {
        name: "Jacinto",
        surName: "Jeremias",
        farmname: "Bodigo",
        email: "bodigogrande@gmail.com",
        username: "jacinto",
        password: hashPass2,
        description: "La mayor seleccion de frutas y verduras del sur de madrid, con especial atencion a la calidad del producto, asi como el desarrollo de agricultura sostenible y de temporada.",
        role: "ADMIN",
        profileImg: "https://images.unsplash.com/photo-1596753365498-2d23bbfcbc24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        location: {
            type: 'Point',
            coordinates: [40.21767892763477, -3.8566696995205048]
        }
    }
]

Farm
    .create(farms)
    .then(allfarmsCreated => {
        console.log(`Created ${allfarmsCreated.length} farms`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))