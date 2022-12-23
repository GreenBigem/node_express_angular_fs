const Category = require('../models/Category')
const errorHadler = require('../utils/errorHandler')
const Position = require('../models/Position')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({ user: res.user.id })
        res.status(200).json(categories)
    } catch (error) {
        errorHadler(res, error)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        errorHadler(res, error)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Category.remove({ _id: req.params.id })
        await Position.remove({ category: req.params.id })
        res.status(200).json({
            message: 'Category deleted.'
        })
    } catch (error) {
        errorHadler(res, error)
    }
}

module.exports.create = async function (req, res) {

    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })

    try {
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        errorHadler(res, error)
    }
}

module.exports.patch = async function (req, res) {
    try {

    } catch (error) {
        errorHadler(res, error)
    }
}
