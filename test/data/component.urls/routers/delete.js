module.exports = function (req, res, scope) {
  const { template } = scope;
  res.send(template.render({ username: "VIG" }, "layout"));
};
