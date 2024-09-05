// import mongoose from 'mongoose';

// const FileSchema = new mongoose.Schema({
//   filename: String,
//   originalName: String,
//   mimetype: String,
//   size: Number,
//   circleName: { type: String, required: true },
//   executorName: { type: String, required: true },
//   circleSpoc: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   uploadDate: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model('File', FileSchema);


/////////////////////////////////////////////////////////////////////////////////////////


import mongoose from 'mongoose';

// Schema for storing file upload information
const FileSchema = new mongoose.Schema({
  filename: String, // Server-side filename
  originalName: String, // Original name of the uploaded file
  mimetype: String, // File type (e.g., 'text/csv')
  size: Number, // File size in bytes
  circleName: { type: String, required: true }, // Related circle name
  executorName: { type: String, required: true }, // Executor's name
  circleSpoc: { type: String, required: true }, // Circle SPOC (Single Point of Contact)
  startDate: { type: Date, required: true }, // Start date
  endDate: { type: Date, required: true }, // End date
  uploadDate: { type: Date, default: Date.now } // Date of upload
});

// Export the model
export default mongoose.model('File', FileSchema);

