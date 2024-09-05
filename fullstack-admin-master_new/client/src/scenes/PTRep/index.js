import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  IconButton,
  InputBase,
  useMediaQuery,
  Grid
} from "@mui/material";
import { FileUploadOutlined } from '@mui/icons-material';
import Header from "components/Header";
import BHeader from "components/BHeader";
import './index.css';
import FlexBetween from "components/FlexBetween";

const PTRep = () => {
  const theme = useTheme(); // Access the theme object to use theme-based styling
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploadStatus, setUploadStatus] = useState(''); // State to store upload status messages
  const [uploadError, setUploadError] = useState(''); // State to store upload error messages
  const [circleName, setCircleName] = useState(''); // State to store the circle name input
  const [executorName, setExecutorName] = useState(''); // State to store the executor name input
  const [circleSpoc, setCircleSpoc] = useState(''); // State to store the circle SPOC input
  const [startDate, setStartDate] = useState(''); // State to store the start date input
  const [endDate, setEndDate] = useState(''); // State to store the end date input

  // Function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    // Check if the file has a .csv extension
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.csv')) {
      setFile(selectedFile); // Set the file in state if valid
      setUploadError(''); // Clear any previous error messages
    } else {
      setFile(null); // Reset the file state if invalid
      alert('Please select a CSV file'); // Alert the user to select a CSV file
      setUploadError('Please select a CSV file.'); // Set an error message
    }
  }, []);

  // Configuration for the Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv' // Restrict accepted files to CSV only
  });

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!file) {
      alert('Please select a CSV file'); // Alert if no file is selected
      setUploadError('Please select a CSV file'); // Set error message
      return;
    }

    // Prepare the form data for the file upload
    const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('circleName', circleName); // Append the circle name
    formData.append('executorName', executorName); // Append the executor name
    formData.append('circleSpoc', circleSpoc); // Append the circle SPOC
    formData.append('startDate', startDate); // Append the start date
    formData.append('endDate', endDate); // Append the end date

    try {
      // Make a POST request to upload the file and details
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for multipart form data
        }
      });
      setUploadStatus('File and details uploaded successfully'); // Set success message
      console.log(response.data); // Log the response data
    } catch (error) {
      setUploadStatus('Error uploading file and details'); // Set error message
      console.error(error); // Log the error to the console
    }
  };

  return (
    <div className="container" sx={{ textAlign: "center" }}>
      {/* Custom header component for the page */}
      <BHeader title="Drop Or Upload" variant="h1" />
      {/* Form for file upload */}
      <form onSubmit={handleSubmit} className="mb-4 input-form-css" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
      }}>
        {/* Grid container for organizing form layout */}
        <Grid container spacing={0} sx={{ border: '1px solid #ddd', padding: '10px', m: '0 auto' }}>
          {/* Grid item for file input section */}
          <Grid item xs={6} sx={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
            {/* Dropzone area for file selection */}
            <div
              {...getRootProps()} // Props for configuring the dropzone
              className="input-css"
              sx={{
                border: '2px dashed #aaa',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              <input {...getInputProps()} /> {/* Input element for file selection */}
              {isDragActive ? (
                <p>Drop the file here...</p> // Display this when a file is being dragged
              ) : (
                <p>Drag & drop a CSV file here, or click to select one</p> // Default message
              )}
            </div>
            {/* Display the selected file name */}
            {file && (
              <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                Selected file: {file.name}
              </Typography>
            )}
            <br />
            {/* Button to upload the file */}
            <Button
              type="submit"
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                padding: "15px 30px",
                mt: "20px",
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
              }}
            >
              <FileUploadOutlined sx={{ mr: "10px" }} />
              Upload
            </Button>
          </Grid>
          {/* Grid item for additional input fields */}
          <Grid item xs={6} sx={{ border: '1px solid #ccc', borderRadius: '10px' }}>
            <Grid container spacing={0}>
              {/* Input field for Circle Name */}
              <Grid item xs={12}>
                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="5rem"
                  p="1rem 1.5rem"
                  margin={"25px"}
                  fontSize={"5rem"}
                >
                  <InputBase
                    placeholder="Circle Name"
                    value={circleName}
                    onChange={(e) => setCircleName(e.target.value)} // Update state on change
                    sx={{ fontSize: "1.5rem" }}
                  />
                </FlexBetween>
              </Grid>
              {/* Input field for Executor Name */}
              <Grid item xs={12}>
                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="5rem"
                  p="1rem 1.5rem"
                  margin={"25px"}
                  fontSize={"5rem"}
                >
                  <InputBase
                    placeholder="Executor Name"
                    value={executorName}
                    onChange={(e) => setExecutorName(e.target.value)} // Update state on change
                    sx={{ fontSize: "1.5rem" }}
                  />
                </FlexBetween>
              </Grid>
              {/* Input field for Circle SPOC */}
              <Grid item xs={12}>
                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="5rem"
                  p="1rem 1.5rem"
                  margin={"25px"}
                  fontSize={"5rem"}
                >
                  <InputBase
                    placeholder="Circle SPOC"
                    value={circleSpoc}
                    onChange={(e) => setCircleSpoc(e.target.value)} // Update state on change
                    sx={{ fontSize: "1.5rem" }}
                  />
                </FlexBetween>
              </Grid>
              {/* Input fields for Start Date */}
              <Grid item xs={6}>
                <Header title={"Start Date"} /> {/* Custom header for input */}
                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="5rem"
                  p="1rem 1.5rem"
                  margin={"25px"}
                  fontSize={"5rem"}
                >
                  <InputBase
                    placeholder="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} // Update state on change
                    sx={{ fontSize: "1.5rem" }}
                  />
                </FlexBetween>
              </Grid>
              {/* Input fields for End Date */}
              <Grid item xs={6}>
                <Header title={"End Date"} /> {/* Custom header for input */}
                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="5rem"
                  p="1rem 1.5rem"
                  margin={"25px"}
                  fontSize={"5rem"}
                >
                  <InputBase
                    placeholder="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} // Update state on change
                    sx={{ fontSize: "1.5rem" }}
                  />
                </FlexBetween>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {/* Display upload status message */}
      {uploadStatus && (
        <p className="text-green-600" sx={{ fontSize: "18px", fontWeight: "bold" }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default PTRep;

