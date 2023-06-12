const mongoose = require('mongoose')

let getEntries = false
let phoneName = ''
let phoneNumber = ''

if (process.argv.length<3) {
  console.log('Missing password')
  process.exit(1)
} else if (process.argv.length<5) {
    console.log('Missing password, name or phone. Displaying all entries')
    getEntries = true
} else if (process.argv.length === 5) {
    console.log('Adding entry')
    phoneName = process.argv[3]
    phoneNumber = process.argv[4]
}

const password = process.argv[2]

const url =
  `mongodb+srv://therealartti:${password}@cluster0.bqadoog.mongodb.net/phoneApp
  ?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (getEntries) {
    Phone.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phone => {
          console.log(phone.name, phone.number)
        })
        mongoose.connection.close()
      })
} else {
    const phone = new Phone({
        name: phoneName,
        number: phoneNumber,
    })
      
    phone.save().then(result => {
      console.log('phone saved!')
      mongoose.connection.close()
    })
}

