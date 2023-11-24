const FeeStatus = require("../models/feeStatus");

exports.createOrUpdateFeePayment = async (req, res) => {
    try {
        const { studentId, feeHistory } = req.body;

        const existingFeePayment = await FeeStatus.findOne({
            schoolId: req.user.schoolId,
            studentId,
            year: 2023,
        });

        if (existingFeePayment) {

            existingFeePayment.feeHistory.push(...feeHistory);
            const updatedFeePayment = await existingFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: updatedFeePayment
            })

        } else {

            const newFeePayment = new FeeStatus({ schoolId: req.user.schoolId, year: 2023, ...req.body });
            const savedFeePayment = await newFeePayment.save();
            res.status(201).json({
                success: true,
                message: "Fee Status is Saved Successfully",
                data: savedFeePayment
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Fee Status is not created Successfully",
            error: error.message
        })
    };
}


exports.getFeeStatus = async (req, res) => {
    try {

        const { studentId } = req.query;

        const feesData = await FeeStatus.find({ schoolId: req.user.schoolId, studentId: studentId });

        res.status(200).json({
            success: true,
            message: "Fees Data Successfully Get",
            data: feesData
        })

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Fees Details is not get Successfully",
            error: error.message
        })

    }
}

// exports.createExam = async (req, res) => {
//     try {

//         const {studentId, year, feeHistory} = req.body;

//         // if (!examName || !className || !section || !examInfo) {
//         //     return res.status(404).json({
//         //         success: false,
//         //         message: "Record Not Found Please Fill All Required Details"
//         //     })
//         // }

//         // const existExam = await ExamModel.findOne({
//         //     "schoolId": req.user.schoolId,
//         //     "className": req.user.classTeacher,
//         //     "section": req.user.section
//         // })

//         // if (existExam) {
//         //     return res.status(400).json({
//         //         success: false,
//         //         message: "Exam of that class and section is already created"
//         //     })
//         // }

//         const feesData = await FeeStatus.create({
//             schoolId: req.user.schoolId,
//             studentId,
//             year
//         })

//         res.status(201).json({
//             success: true,
//             message: "Exam is Successfully Created",
//             examData
//         })

//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Exam is not created Successfully",
//             error: error.message
//         })
//     }
// }

// exports.deleteExam = async (req, res) => {
//     try {

//         const {examId} = req.params;

//         const existExam = await ExamModel.findById(examId);

//         if (!existExam) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Exam Data not found"
//             })
//         }

//         const deletedExam = await existExam.deleteOne();

//         res.status(200).json({
//             success: true,
//             message: "Deleted Exam Info is Successfully",
//             deletedExam
//         })

//     } 
//     catch (error) {

//         res.status(500).json({
//             success: false,
//             message: "Delete info of Exam not done successfully due to error",
//             error: error.message
//         })

//     }
// }

// exports.updateExam = async (req, res) => {
//     try {

//         const {...examFields} = req.body;

//         const existExamData = await ExamModel.findOne({
//             schoolId: req.user.schoolId,
//             className: examFields.className,
//             section: examFields.section
//         })

//         if (!existExamData) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Exam Details is not found"
//             })
//         }

//         for (const key in examFields) {

//             if (key === "examName" || key === "examInfo")
//                 existExamData[key] = examFields[key]
//         }

//         const updatedExamData = await existExamData.save();

//         res.status(200).json({
//             success: true,
//             message: "Exam Details is successfully updated",
//             updatedExamData
//         })

//     }
//     catch (error) {

//         res.status(500).json({
//             success: false,
//             message: "Update Details of Exam is not successfully",
//             error: error.message
//         })

//     }
// }
