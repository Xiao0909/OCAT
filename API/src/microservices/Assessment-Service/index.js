const { Assessments } = require(`../Database`);

exports.submit = async (assessment) => {
  // use the bookshelf model Assessments from API/src/microservices/Database to save
  // the assessment data in the PostgreSQL database
<<<<<<< Updated upstream
=======
  assessment.created_at = new Date();
  const this_value = assessment;
  if (this_value.score === 0 || this_value.score === 1) {
    this_value.risk_level = `LOW`;
  } else if (this_value.score === 2 || this_value.score === 3) {
    this_value.risk_level = `MID`;
  }
  else if (this_value.score === 4 || this_value.score === 5) {
    this_value.risk_level = `HIGH`;
  }
  Assessments.forge({
    cat_date_of_birth: this_value.birth,
    cat_name: this_value.catName,
    created_at: this.created_at,
    risk_level: this_value.risk_level,
    score: this_value.score,
  }).save();
>>>>>>> Stashed changes
};

exports.getList = () => {
  // use the bookshelf model Assessments from API/src/microservices/Database to fetch
  // the assessment data from the PostgreSQL database
  Assessments.where({ deleted_at: null }).orderBy(`id`, `ASC`).fetchAll().then((resData) => resData.serialize());
};
