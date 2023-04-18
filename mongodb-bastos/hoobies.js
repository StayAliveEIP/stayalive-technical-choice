const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB', error));

const User = mongoose.model('User', {
    name: String,
    age: Number,
    city: String,
    hobbyIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby' }]
});

const Hobby = mongoose.model('Hobby', {
    name: String,
    category: String
});

const hobbies = [
    { name: 'Reading', category: 'Indoor' },
    { name: 'Gardening', category: 'Outdoor' },
    { name: 'Hiking', category: 'Outdoor' },
    { name: 'Painting', category: 'Indoor' },
    { name: 'Swimming', category: 'Outdoor' }
];

Hobby.insertMany(hobbies)
    .then(result => console.log('Hobbies added:', result))
    .catch(error => console.error('Error adding hobbies', error))
    .then(() => {
        const users = [
            { name: 'John', age: 35, city: 'New York', hobbyIds: [result[0]._id, result[1]._id] },
            { name: 'Jane', age: 28, city: 'London', hobbyIds: [result[2]._id, result[3]._id] },
            { name: 'Bob', age: 42, city: 'Paris', hobbyIds: [result[1]._id, result[3]._id] },
            { name: 'Alice', age: 25, city: 'Berlin', hobbyIds: [result[0]._id, result[4]._id] },
            { name: 'Tom', age: 31, city: 'San Francisco', hobbyIds: [result[1]._id, result[2]._id] },
        ];

        User.insertMany(users)
            .then(result => console.log('Users added:', result))
            .catch(error => console.error('Error adding users', error))
            .finally(() => {
                User.aggregate([
                    {
                        $lookup: {
                            from: 'hobbies',
                            localField: 'hobbyIds',
                            foreignField: '_id',
                            as: 'hobbies'
                        }
                    },
                    {
                        $unwind: '$hobbies'
                    },
                    {
                        $group: {
                            _id: '$hobbies.category',
                            averageAge: { $avg: '$age' },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            category: '$_id',
                            averageAge: 1,
                            count: 1
                        }
                    },
                    {
                        $sort: { averageAge: -1 }
                    }
                ])
                    .then(result => console.log(result))
                    .catch(error => console.error('Error aggregating documents', error))
                    .finally(() => mongoose.connection.close());
            });
    });
