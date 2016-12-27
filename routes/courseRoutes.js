var express = require('express');
var Course = require('../models/courseModel');

var routes = function () {
    var courseRouter = express.Router();
    var courseController = require('../controllers/courseController')(Course);
    
    courseRouter.route('/')
        .get(courseController.get)
        .post(courseController.post);
    
    courseRouter.use('/:courseId', function (req, res, next) {
        Course.findById(req.params.courseId, function (err, course) {
            if (err) {
                res.status(500).send(err);
            } else if (course) {
                req.course = course;
                next();
            } else {
                res.ststus(404).send('Course Not Found');
            }
        });
    });

    courseRouter.route('/:courseId')
        .get(courseController.getById)
        .put(courseController.put)
        .delete(courseController.remove);
    
    return courseRouter;
};

module.exports = routes;