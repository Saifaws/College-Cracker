const express = require("express");
const router = express.Router();

const {
  deleteCollege,
  getColleges,
  createNewCollege,
  updateCollege,
} = require("../controllers/collegeController");

router.get("/colleges", getColleges); // read
router.post("/create-college", createNewCollege); // create
router.put("/update-college", updateCollege); //update
router.delete("/delete-college", deleteCollege); // delete

module.exports = router;
