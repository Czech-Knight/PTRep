// import express from 'express';
// import multer from 'multer';
// import { default as File } from '../models/File.js';
// import path from 'path';

// const router = express.Router();

// const csvFilter = (req, file, cb) => {
//   if (file.mimetype === 'text/csv' || file.originalname.toLowerCase().endsWith('.csv')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Please upload only CSV files.'), false);
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage, fileFilter: csvFilter });

// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const { circleName, executorName, circleSpoc, startDate, endDate } = req.body;

//     const newFile = new File({
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//       circleName,
//       executorName,
//       circleSpoc,
//       startDate,
//       endDate
//     });

//     await newFile.save();
//     res.status(201).json(newFile);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// export default router;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


import express from 'express';
import multer from 'multer';
import { default as File } from '../models/File.js';
import path from 'path';

const router = express.Router();

// Filter to allow only CSV files
const csvFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv' || file.originalname.toLowerCase().endsWith('.csv')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only CSV files.'), false);
  }
};

// Storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  }
});

// Multer middleware for file upload
const upload = multer({ storage, fileFilter: csvFilter });

// Route to handle file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Destructure additional form fields from request body
    const { circleName, executorName, circleSpoc, startDate, endDate } = req.body;

    // Create a new File document in the database
    const newFile = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      circleName,
      executorName,
      circleSpoc,
      startDate,
      endDate
    });

    await newFile.save(); // Save the file information in the database
    res.status(201).json(newFile); // Respond with the saved file information
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});

export default router;
