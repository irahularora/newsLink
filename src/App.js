import './App.css';
import { useState } from 'react';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar';


const App = () => {
  const [progress, setProgress] = useState(0)
  let apiKey = process.env.REACT_APP_NEWS_API;
  var pageSize = 15;
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} key="general" pageSize={pageSize} api={apiKey} country="in" category="general" />}> </Route>
          <Route exact path='/business' element={<News setProgress={setProgress} key='business' pageSize={pageSize} api={apiKey} country="in" category="business" />}> </Route>
          <Route exact path='/health' element={<News setProgress={setProgress} key='health' pageSize={pageSize} api={apiKey} country="in" category="health" />}> </Route>
          <Route exact path='/science' element={<News setProgress={setProgress} key='science' pageSize={pageSize} api={apiKey} country="in" category="science" />}> </Route>
          <Route exact path='/sports' element={<News setProgress={setProgress} key='sports' pageSize={pageSize} api={apiKey} country="in" category="sports" />}> </Route>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} api={apiKey} country="in" category="entertainment" />}> </Route>
          <Route exact path='/technology' element={<News setProgress={setProgress} key='technology' pageSize={pageSize} api={apiKey} country="in" category="technology" />}> </Route>
        </Routes>
      </Router>
    </div>
  )
} 
export default App;

