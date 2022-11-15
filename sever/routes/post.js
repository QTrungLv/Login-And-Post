const express = require('express')
const verifyToken = require('../middleware/auth')
const { findOne } = require('../models/Post')
const router = express.Router()

const Post = require('../models/Post')



router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

// @route POST api/posts
// @desc Create post
// access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    //Simple validation
    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }

    try {
        const newPost = new Post({
            title,
            description: description,
            url: url.startsWith("https://") ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: 'Good luck', post: newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }

})

// @route PUT api/posts
// @desc Update post
// access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" })
    }

    try {
        let updatePost = {
            title,
            description: description || '',
            url: (url.startsWith("https://") ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }

        // Required to update
        const postUpdateRequired = { _id: req.params.id, user: req.userId }

        //Update
        updatePost = await Post.findOneAndUpdate(postUpdateRequired, updatePost, { new: true })

        //User not authorised to update post
        if (!updatePost) {
            return res.status(401).json({ success: false, message: "Post not found or user not authorised" })
        }

        res.json({ success: true, message: "Update successfully", post: updatePost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        //Required to delete
        const postDeleteRequired = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findOneAndDelete(postDeleteRequired)

        //If not
        if (!deletePost) {
            res.status(401).json({ success: false, message: "Post not found or user not authorised" })
        }
        console.log("successfully")
        res.json({ success: true, message: "Delete successfully", post: deletePost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

module.exports = router