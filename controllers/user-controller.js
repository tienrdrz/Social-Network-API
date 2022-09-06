const { User } = require('../models');

const userController = {
    //GET all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //GET a single user
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        //populate thoughts
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        //populate friends
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => {
            //if no user found
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //POST a new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //PUT to update user, make sure to run validators
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            //if no user found
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err)); 
    },
    //DELETE a user
    deleteUser({ params}, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //POST to add a friend
    addFriend({ params }, res) {
        //using addToSet to add a friend via path to model
        User.findOneAndUpdate({ _id: params.userId }, {$addToSet: { friends: params.friendId } }, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    }, 
    //DELETE to remove a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, {$pull: { friends: params.friendId }}, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;