const Visitor = require("../models/Visitor");

exports.index = async (req, res) => {
  const visitors = await Visitor.find();
  
  res.send(visitors);
}

exports.add = (req, res) => {
  const newVisitor = new Visitor({
      slug: req.originalUrl,
      info: req.ip
  });
  
  newVisitor.save()
};
