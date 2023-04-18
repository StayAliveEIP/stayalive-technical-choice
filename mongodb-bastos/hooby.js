const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB', error));


const Hobby = mongoose.model('Hobby', {
    name: String,
    category: String
});

const User = mongoose.model('User', {
    name: String,
    age: Number,
    city: String,
    hobbyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }]
});

const hobbies = [
    { name: 'Reading', category: 'Indoor' },
    { name: 'Gardening', category: 'Outdoor' },
    { name: 'Hiking', category: 'Outdoor' },
    { name: 'Painting', category: 'Indoor' },
    { name: 'Swimming', category: 'Outdoor' }
];

User.aggregate([
    {
        $lookup: {
            from: 'hobbies',
            localField: 'hobbyIds',
            foreignField: '_id',
            as: 'hobbies'
        }
    }
])
    .then(result => console.log(result))
    .catch(error => console.error('Error aggregating documents', error))
