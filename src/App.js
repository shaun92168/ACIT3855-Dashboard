import React, { useState, useEffect } from 'react'
import gymImg from './gym.png';
import './App.css';

const axios = require('axios').default;

const getNumRequest = 'http://localhost:8100/events/stats'
const getFirstScanRequest = 'http://localhost:8110/scan_in/nth?n=1'
const getAvgWeightRequest = 'http://localhost:8110/body_info/average?startDate=2020-01-01T11:55:01&endDate=2020-04-11T11:56:01'

function App() {
  const [biNum, setBiNum] = useState("0")
  const [scanNum, setScanNum] = useState("0")
  const [firstScan, setFirstScan] = useState("0")
  const [avgWeight, setAvgWeight] = useState("0")

  const getBiNum = () => {
    axios.get(getNumRequest)
      .then(json => {
        setBiNum(json.data.num_bi_records)
      })
  }

  const getScanNum = () => {
    axios.get(getNumRequest)
      .then(json => {
        setScanNum(json.data.num_scanin_records)
      })
  }

  const getFirstScan = () => {
    axios.get(getFirstScanRequest)
      .then(json => {
        setFirstScan(json.data.datetime)
      })
  }

  const getAvgWeight = () => {
    axios.get(getAvgWeightRequest)
      .then(json => {
        setAvgWeight(json.data.average_weight)
      })
  }

  const updatePage = () => {
    console.log("updating")
    getBiNum()
    getScanNum()
    getFirstScan()
    getAvgWeight()
    setTimeout(updatePage, 3000)
  }

  useEffect(() => {
    updatePage()
  }, [])
  

  return (
    <div className="App">
      <img src={gymImg} height="200" />
      <h3>Number of body_info updates</h3>
      <p>{biNum}</p>
      <h3>Number of scan</h3>
      <p>{scanNum}</p>
      <h3>First scan</h3>
      <p>{firstScan}</p>
      <h3>Avg Weight</h3>
      <p>{avgWeight}</p>
    </div>
  );
}

export default App;
