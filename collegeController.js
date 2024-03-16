const College = require("../models/College");

const getColleges = async (req, res) => {
  const results = await College.find({ createdBy: req.query.createdBy });
  res.status(200).send(results);
};

const createNewCollege = (req, res) => {
  const college = new College({
    name: req.body.name,
    branch: req.body.branch,
    location: req.body.location,
    status: req.body.status,
    createdBy: req.body.createdBy,
    date: req.body.date,
  });
  college.save().then(() => console.log("college added"));

  res.status(200).send("college added in the database correctly");
};

const updateCollege = (req, res) => {
  const collegeID = req.query.id;

  College.updateOne({ _id: collegeID }, { $set: req.body })
    .then(() => console.log("College updated"))
    .catch((err) => {
      console.log(err);
    });

  res.status(200).send("College updated in the database correctly");
};

const deleteCollege = (req, res) => {
  const collegeID = req.query.id;

  College.deleteOne({ id: collegeID })
    .then(() => console.log("College deleted"))
    .catch((err) => {
      console.log(err);
    });

  res.status(200).send("College deleted in the database correctly");
};

module.exports = {
  getColleges,
  createNewCollege,
  updateCollege,
  deleteCollege,
};
