const mongoose = require('mongoose');


const data = [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Bob', age: 32, city: 'San Francisco' },
    { name: 'Charlie', age: 28, city: 'Los Angeles' },
    { name: 'David', age: 41, city: 'Chicago' },
    { name: 'Eve', age: 24, city: 'Miami' },
    { name: 'Frank', age: 35, city: 'Seattle' },
    { name: 'Grace', age: 29, city: 'Austin' },
    { name: 'Harry', age: 31, city: 'Boston' },
    { name: 'Ivy', age: 27, city: 'Portland' },
    { name: 'Jack', age: 36, city: 'Denver' },
];



mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB', error));


const User = mongoose.model('User', {
    name: String,
    age: Number,
    city: String
});


User.aggregate([
    {
        $group: {
            _id: null,
            count: { $sum: 1 }
        }
    }
])
    .then(result => console.log(`There are ${result[0].count} users in the collection`))
    .catch(error => console.error('Error aggregating documents', error))

User.aggregate([
    {
        $match: { age: { $gte: 30 } }
    },
    {
        $group: {
            _id: null,
            count: { $sum: 1 }
        }
    }
])
    .then(result => console.log(`There are ${result[0].count} users over 30 years old in the collection`))
    .catch(error => console.error('Error aggregating documents', error))



User.aggregate([
    {
        $match: { name: { $regex: /^A/i } }
    },
    {
        $group: {
            _id: null,
            count: { $sum: 1 }
        }
    }
])
    .then(result => console.log(`There are ${result[0].count} users whose name begins with 'A' in the collection`))
    .catch(error => console.error('Error aggregating documents', error))


User.aggregate([
    {
        $project: {
            _id: 0,
            firstName: { $arrayElemAt: [{ $split: ['$name', ' '] }, 0] }
        }
    }
])
    .then(result => console.log(result))
    .catch(error => console.error('Error aggregating documents', error))


User.aggregate([
    {
        $match: { city: 'New York' }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            age: 1
        }
    }
])
    .then(result => console.log(result))
    .catch(error => console.error('Error aggregating documents', error))


User.aggregate([
    {
        $match: { city: 'New York' }
    },
    {
        $group: {
            _id: '$name',
            age: { $first: '$age' }
        }
    },
    {
        $project: {
            _id: 0,
            name: '$_id',
            age: 1
        }
    }
])
    .then(result => console.log(result))
    .catch(error => console.error('Error aggregating documents', error))


