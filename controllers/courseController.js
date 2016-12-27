var courseController = function (Course) {
    var get = function (req, res) {
        var query = {};
        if (req.query.title) {
            query.title = req.query.title;
        } else if (req.query.author) {
            query.author = req.query.author;
        } else if (req.query.tag) {
            query.tag = req.query.tag;
        }

        Course.find(query, function (err, courses) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(courses);
            }
        });
    };

    var getById = function (req, res) {
        res.json(req.course);
    };

    var post = function (req, res) {
        var course = new Course(req.body);
        course.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(course);
            }
        });        
    };

    var put = function (req, res) {
        req.course.title = req.body.title;
        req.course.description = req.body.description;
        req.course.author = req.body.author;
        req.course.tags = req.body.tags;

        req.course.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(req.course);
            }
        });
    };

    var remove = function (req, res) {
        req.course.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Course Removed');
            }
        });
    };

    return {
        get: get,
        getById: getById,
        post: post,
        put: put, 
        remove: remove
    };
};

module.exports = courseController;