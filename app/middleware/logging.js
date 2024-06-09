const visitor = require("../controllers/visitorController.js");

const logVisitor = async (req, res, next) => {
    visitor.add(req, res);

    return next();
};

module.exports = logVisitor;
