const Url = require("../models/Url");

exports.redirect = async (req, res) => {
  const url = await Url.findOne({ slug: req.params.slug });

  if(!url) return res.status(404).send()

  let returnedUrl = url.original
  if(req.params[0] && returnedUrl.slice(-1)=='/') {
      returnedUrl = returnedUrl.slice(0, -1)
      returnedUrl += req.params[0]
  }
  
  res.redirect(301, returnedUrl)
}

exports.view = async (req, res) => {
  res.send(await Url.findOne({ slug: req.params.slug }));
}

exports.index = async (req, res) => {
  const urls = await Url.find();

  res.send(urls);
}

exports.add = async (req, res, next) => {
  const newUrl = new Url({
      original: req.body.original
  });
  
  if(req.body.slug)
      newUrl.slug = req.body.slug

  const result = await newUrl.save()
  res.send(result)
};

exports.edit = (req, res, next) => {
  Url.findOneAndUpdate({ slug: req.params.slug }, { original: req.body.original })
    .then(() => res.send({message: 'Url updated!'}))
    .catch((err) => res.send(err));
}

exports.del = (req, res, next) => {
  Url.deleteOne({ slug: req.params.slug })
    .then(() => res.send({message: 'Url deleted!'}))
    .catch((err) => res.send(err));
}
