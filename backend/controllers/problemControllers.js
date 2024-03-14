const User = require("../models/userModels");
const Problem = require("../models/problemModel");
const Testcase = require("../models/testcaseModel");
const ErrorResponse = require("../utils/errorResponse");

// create a problem with multiple test cases
exports.newproblem = async (req, res, next) => {
  try {
    // Extract test cases from the request body
    const { testcases, ...problemData } = req.body;

    // Create the problem
    const problem = await Problem.create(problemData);

    // Create the test cases and associate them with the problem
    const createdTestcases = await Testcase.insertMany(
      testcases.map((testcase) => ({ ...testcase, problem: problem._id }))
    );

    // Add the IDs of the created test cases to the problem
    problem.testcases = createdTestcases.map((testcase) => testcase._id);
    await problem.save();

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    next(error);
  }
};

//   // create a problem with multiple test cases
// exports.newproblem = async (req, res, next) => {
//     try {
//       const { testcases, ...problemData } = req.body;
//       const userId = req.headers['user-id']; // Extract the user ID from the request headers

//       const problem = await Problem.create({ ...problemData, user: userId });

//       const createdTestcases = await Testcase.insertMany(
//         testcases.map((testcase) => ({ ...testcase, problem: problem._id }))
//       );

//       problem.testcases = createdTestcases.map((testcase) => testcase._id);
//       await problem.save();

//       res.status(200).json({
//         success: true,
//         problem,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

//show single problem
exports.singleProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).select("-testcases");
    res.status(200).json({
      success: true,
      problem,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

exports.testProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).populate("testcases"); // Populate the testcases array with actual Testcase objects

    // Extract the input and output fields from the populated testcases array
    const testcases = problem.testcases.map((testcase) => ({
      input: testcase.input,
      output: testcase.output,
    }));

    res.status(200).json({
      success: true,
      testcases,
      timeLimit: problem.timeLimit,
    });
    next();
  } catch (error) {
    return next(error);
  }
};
exports.testProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).populate("testcases"); // Populate the testcases array with actual Testcase objects

    // Extract the input and output fields from the populated testcases array
    const testcases = problem.testcases.map((testcase) => ({
      input: testcase.input,
      output: testcase.output,
    }));

    res.status(200).json({
      success: true,
      testcases,
      timeLimit: problem.timeLimit,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//   //load all problem
// exports.allProblems = async (req, res, next) => {
//     //enable pagination
//     const pageSize = 10;
//     const page = Number(req.query.pageNumber) || 1;
//     const count = await Problem.find({}).estimatedDocumentCount();

//     try {
//       const problems = await Problem.find()
//         .sort({ createdAt: -1 })
//         .select("-password")
//         .skip(pageSize * (page - 1))
//         .limit(pageSize);

//       res.status(200).json({
//         success: true,
//         problems,
//         page,
//         pages: Math.ceil(count / pageSize),
//         count,
//       });
//       next();
//     } catch (error) {
//       return next(error);
//     }
//   };

//load all problem based on diff,
exports.allProblems = async (req, res, next) => {
  const { difficulty, problemType, pageNumber } = req.query;
  const pageSize = 10;
  const page = Number(pageNumber) || 1;

  try {
    let query = Problem.find();

    if (difficulty) {
      query = query.where("difficulty").equals(difficulty);
    }

    if (problemType) {
      query = query.where("problemType").equals(problemType);
    }

    const count = await Problem.countDocuments(query);

    const problems = await query
      .sort({ createdAt: -1 })
      .select("title problemType difficulty")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      problems,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};
