const auth = require("./middleware/auth");
const logging = require("./middleware/logging");

module.exports = app => {
  
  var router = require("express").Router();

  const user = require("./controllers/userController.js");
  const url = require("./controllers/urlController.js");
  const visitor = require("./controllers/visitorController.js");
  app.use('/', router);

  router.post("/user/register", user.register);

  router.use('/admin', auth);
  
  router.get("/admin/user", user.index);

  router.get("/admin/visitor", visitor.index);

  router.get("/admin/urls", url.index);
  router.get("/admin/urls/:slug", url.view);
  router.post("/admin/urls", url.add);  
  router.put("/admin/urls/:slug", url.edit);
  router.delete("/admin/urls/:slug", url.del);
  
  router.get("/:slug*", logging, url.redirect);

  router.delete("/db/empty", async (req, res) => {
    await require("./models/Url").deleteMany({});
    await require("./models/User").deleteMany({});
    await require("./models/Visitor").deleteMany({});

    res.send({message: 'DB has been emptied successfully!'})
  })
};
