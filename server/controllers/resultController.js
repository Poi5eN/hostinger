const Results = require('../models/result')

exports.createResults = async (req, res) => {
    try {
      const { resultsRecords, examName, className, section} = req.body;

      console.log('first',resultsRecords )
  
      const resultData = resultsRecords.map(({ studentId,studentName, rollNo, subjects  }) => ({
        schoolId: req.user.schoolId,
        studentId: studentId,
        rollNo: rollNo,
        studentName: studentName,
        className: className,
        section: section,
        examName: examName,
        subjects
      }));
   
     
      const insertedResults = await Results.insertMany(resultData);
  
      res.status(201).json({success: true, data: insertedResults});
  
    }
    catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Failed to create Attendance",
        error: error.message
      });
    }
  }
  
  
  exports.getResults = async (req, res) => {
    try {
        const { examName, className , section } = req.query

        let filter = {
            ...(examName ? { examName: examName } : {}),
            ...(className ? { className: className } : {}),
            ...(section ? { section: section } : {}),
          };

      const result = await Results.find({ schoolId: req.user.schoolId, ...filter });
  
      res.status(200).json({
        success: true,
        message: "Results is fetch is successfully",
        data: result
      })
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Results is not get due to error",
        error: error.message
      })
    }
  }