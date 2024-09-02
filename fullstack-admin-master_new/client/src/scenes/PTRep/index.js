import React, { useState } from 'react';
import axios from 'axios';
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
import './index.css'

import FlexBetween from "components/FlexBetween";
const PTRep = () => {
  const theme = useTheme(); // Get the theme object
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [circleName, setCircleName] = useState('');
  const [executorName, setExecutorName] = useState('');
  const [circleSpoc, setCircleSpoc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.csv')) {
      setFile(selectedFile);
      setUploadError('');
    } else {
      setFile(null);
      alert('Please select a CSV file')
      setUploadError('Please select a CSV file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a CSV file')
      setUploadError('Please select a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('File uploaded successfully');
      console.log(response.data);
    } catch (error) {
      setUploadStatus('Error uploading file');
      console.error(error);
    }
  };

  return (
    <div className="container" sx={{ textAlign: "center" }}>
      <BHeader title="Drop Or Upload" variant= "h1"/>
      <form onSubmit={handleSubmit} className="mb-4 input-form-css" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "20px",
      }}>
        <Grid container spacing={0} sx={{ border: '1px solid #ddd', padding: '10px',m:'0 auto' }}>
          <Grid item xs={6} sx={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
           <div className='input-css'>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="input-file-css"
              sx={{
                // add margin top
              }}
            />
            </div>
            <br/>
            <Button 
              type="submit" 
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                padding: "15px 30px",
                mt: "20px", // add margin top
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
              }}
            >
              <FileUploadOutlined sx={{ mr: "10px" }} />
              Upload
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ border: '1px solid #ccc', borderRadius: '10px'}}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                {/* <input 
                  type="text" 
                  placeholder="Circle Name" 
                  value={circleName} 
                  onChange={(e) => setCircleName(e.target.value)} 
                  className="input-field-css"
                /> */}

           <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="1rem 1.5rem"
            margin={"25px"}
            fontSize={"5rem"}
          >
            <InputBase placeholder="Circle Name"
            value={circleName} 
            onChange={(e) => setCircleName(e.target.value)} 
            sx={{
              fontSize:"1.5rem"
            }}
            />
          </FlexBetween>
              </Grid>
              <Grid item xs={12}>
                {/* <input 
                  type="text" 
                  placeholder="Executor Name" 
                  value={executorName} 
                  onChange={(e) => setExecutorName(e.target.value)} 
                  className=" input-field-css"
                /> */}
                 <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="1rem 1.5rem"
            margin={"25px"}
            fontSize={"5rem"}
          >
            <InputBase placeholder="Executor Name"
           value={executorName} 
           onChange={(e) => setExecutorName(e.target.value)} 
            sx={{
              fontSize:"1.5rem"
            }}
            />
          </FlexBetween>
              </Grid>
              <Grid item xs={12}>
                {/* <input 
                  type="text" 
                  placeholder="Circle SPOC" 
                  value={circleSpoc} 
                  onChange={(e) => setCircleSpoc(e.target.value)} 
                  className=" input-field-css"
                /> */}
                 <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="1rem 1.5rem"
            margin={"25px"}
            fontSize={"5rem"}
          >
            <InputBase placeholder="Circle SPOC"
            value={circleSpoc} 
            onChange={(e) => setCircleSpoc(e.target.value)}  
            sx={{
              fontSize:"1.5rem"
            }}
            />
          </FlexBetween>
              </Grid>
              <Grid item xs={6}>
                <Header title={"Start Date"} />
                {/* <input 
                  type="date" 
                  placeholder="Start Date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className=" input-field-css dates"
                /> */}
                 <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="1rem 1.5rem"
            margin={"25px"}
            fontSize={"5rem"}
          >
            <InputBase placeholder="Circle Name"
           type='date'
           value={startDate} 
           onChange={(e) => setStartDate(e.target.value)} 
            sx={{
              fontSize:"1.5rem"
            }}
            />
          </FlexBetween>
              </Grid>
              <Grid item xs={6}>
              <Header title={"End Date"} xs={6} />
                {/* <input 
                  type="date" 
                  placeholder="End Date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}                  
                  className=" input-field-css dates"
                /> */}
                 <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="5rem"
            p="1rem 1.5rem"
            margin={"25px"}
            fontSize={"5rem"}
          >
            <InputBase placeholder="Circle Name"
            type='date'
            value={endDate} 
             onChange={(e) => setEndDate(e.target.value)}
            sx={{
              fontSize:"1.5rem"
            }}
            />
          </FlexBetween>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {uploadStatus && (
        <p className="text-green-600" sx={{ fontSize: "18px", fontWeight: "bold" }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default PTRep;