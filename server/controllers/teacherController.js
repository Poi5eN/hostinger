const studyMaterial = require('../models/studyMaterial')
const cloudinary = require('cloudinary');
const getDataUri = require('../utils/datauri');
const Attendance = require('../models/attendance');
const {startOfMonth, endOfMonth} = require('date-fns')


exports.createStudyMaterial = async (req, res) => {
    try {
      const { title, type, link } = req.body;
      console.log('ui',req.user.schoolId)
      console.log('uo',type)
      const file = req.file;
  
      let study
  
      if (type == "youtube" || type == "Video") {
        study = await studyMaterial.create({
            schoolId: req.user.schoolId,
            title,
            type,
            link
          });
      } else {
        const fileDataUri = getDataUri(file);
        const mycloud = await cloudinary.v2.uploader.upload(fileDataUri.content);
        study = await studyMaterial.create({
          schoolId: req.user.schoolId,
          title,
          type,
          file: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
          }
        });
      }
      res.status(201).json({
        success: true,
        message: "Study Material is successfully created",
        study
      });
    }
    catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: "Study Material is not created due to error",
        error: error.message
      });
    }
  }

  exports.getStudyMaterial = async (req, res) => {
    try {
  
    //   const {studyId} = req.query;
  
    //   const filter = {
    //     ...(studyId ? {_id: studyId} : {})
    //   }
  
      const study = await studyMaterial.find({schoolId: req.user.schoolId});
  
      res.status(200).json({
        success: true,
        message: "Study Material is fetch is successfully",
        study
      })
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Study Material is not get due to error",
        error: error.message
      })
    }
  }


  exports.deleteStudyMaterial = async (req, res) => {
    try {

      const {studyId} = req.params;
      console.log('io',req.params)
      console.log("yId",studyId)
  
      const existStudy = await studyMaterial.findById({schoolId: req.user.schoolId, _id: studyId});
  
      if (!existStudy) {
        return res.status(400).json({
          success: false,
          message: "Study Material does not exist"
        })
      }
  
      const deleteStudy = await studyMaterial.deleteOne({_id: studyId});
  
      res.status(200).json({
        success: true,
        message: "Study Material deleted successfully",
        deleteStudy
      })
  
    }
    catch (error) {
      res.status(500).json({
        success: false,
        message: "Study Material is not deleted due to error",
        error: error.message
      });
    }
  }



//   exports.createAttendance = async (req, res) => {
//     try {
//       const { attendanceRecords } = req.body;

//       console.log("req.user", req.user);
//       console.log("req.user._id", req.user._id);

//   // console.log(teacherId, date, attendanceRecords)
//       // Create an array of attendance records
//       const attendanceData = attendanceRecords.map(({ studentId, present, rollNo, date }) => ({
//         className: req.user.classTeacher,
//         section: req.user.section,
//         schoolId: req.user.schoolId,
//         studentId: studentId,
//         // studentName: studentName,
//         // teacher: req.user._id,
//         rollNo: rollNo,
//         date: new Date(date),
//         present,
//       }));
  
//       const insertedAttendance = await Attendance.insertMany(attendanceData);
  
//       res.status(201).json(insertedAttendance);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to create attendance', message: error.message });
//     }
//   };
  
  
//   exports.getAttendanceByMonth = async (req, res) => {
//     try {
//       const { year, month } = req.query;
//       console.log(req.query)
//       // Create a date range for the specified month
//       const startDate = startOfMonth(new Date(year, month - 1));
//       const endDate = endOfMonth(startDate);

//       console.log('yo',startDate)
//       console.log('y1',endDate)
  
//       // const attendance = await Attendance.find({
//       //   className: req.user.classTeacher,
//       //   section: req.user.section,
//       //   date: { $gte: startDate, $lte: endDate },
//       // });

//       const attendance = await Attendance.aggregate([
//         {
//           $match: {
//             schoolId: req.user.schoolId,
//             className: req.user.classTeacher,
//             section: req.user.section,
//             date: { $gte: startDate, $lte: endDate }
//           }
//         },
//         {
//           $group: {
//             _id: {
//               // schoolId: '$schoolId',
//               studentId: '$studentId',
//               // className: '$className',
//               // section: '$section'
//             },
//             attendanceData: {
//               $push: {
//                 date: '$date',
//                 present: '$present'
//               }
//             }
//           }
//         },
//         {
//           $project: {
//             _id: 0,
//             studentId: '$_id.studentId',
//             schoolId: '$_id.schoolId',
//             studentName: '$_id.fullName',
//             // className: '$_id.className',
//             // section: '$_id.section',
//             attendanceData: 1
//           }
//         }
//       ]);
  
//       res.status(200).json({message: true, data:attendance});
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch attendance records by month' });
//     }
//   };
  
  
//  exports.updateAttendance = async (req, res) => {
//     try {
//       const { attendanceId, present } = req.body;
//       const attendance = await Attendance.findByIdAndUpdate(attendanceId, { present }, { new: true });
//       res.status(200).json(attendance);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to update attendance' });
//     }
//   };


exports.createAttendance = async (req, res) => {
  try {
    const { attendanceRecords } = req.body;

    console.log("req.user", req.user);
    console.log("req.user._id", req.user._id);

// console.log(teacherId, date, attendanceRecords)
    // Create an array of attendance records
    const attendanceData = attendanceRecords.map(({ studentId, present, rollNo, date }) => ({
      className: req.user.classTeacher,
      section: req.user.section,
      schoolId: req.user.schoolId,
      studentId: studentId,
      // studentName: studentName,
      // teacher: req.user._id,
      rollNo: rollNo,
      date: new Date(date),
      present,
    }));

    const insertedAttendance = await Attendance.insertMany(attendanceData);

    res.status(201).json(insertedAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendance', message: error.message });
  }
};


exports.getAttendanceByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    console.log(req.query)
    // Create a date range for the specified month
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(startDate);

    console.log('yo',startDate)
    console.log('y1',endDate)

    // const attendance = await Attendance.find({
    //   className: req.user.classTeacher,
    //   section: req.user.section,
    //   date: { $gte: startDate, $lte: endDate },
    // });

    const attendance = await Attendance.aggregate([
      {
        $match: {
          schoolId: req.user.schoolId,
          className: req.user.classTeacher,
          section: req.user.section,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            // schoolId: '$schoolId',
            studentId: '$studentId',
            // className: '$className',
            // section: '$section'
          },
          attendanceData: {
            $push: {
              date: '$date',
              present: '$present'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          studentId: '$_id.studentId',
          schoolId: '$_id.schoolId',
          studentName: '$_id.fullName',
          // className: '$_id.className',
          // section: '$_id.section',
          attendanceData: 1
        }
      }
    ]);

    res.status(200).json({message: true, data:attendance});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance records by month' });
  }
};


exports.updateAttendance = async (req, res) => {
  try {
    const { attendanceId, present } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(attendanceId, { present }, { new: true });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
};