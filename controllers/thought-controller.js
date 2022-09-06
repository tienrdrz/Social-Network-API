const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //GET a single thought
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
        .select('-__v')
        .sort({ _id: -1})
        .then(dbThoughtData => {
            //if no id
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //POST a new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData}},
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
        })
    },
    //PUT to update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            //if no thought found
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err)); 
    },
    //DELETE a thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //POST to add a new reaction
    addReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, { $push: { reactions: body }}, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought with this id' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))  
    },
    //DELETE a reaction
    deleteReaction({ params }, res) {
        //pulling the reaction using its id and removing it
        Thought.findOneAndUpdate({ _id: params.id }, { $pull: {reactions: {reactionId: params.reactionId}}}, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ messaage: 'There is no thought with this id'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;