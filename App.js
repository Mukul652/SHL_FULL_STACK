import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar';

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/projects')
      .then((response) => {
        const projectsData = response.data;
        setData(response.data);
        setOriginalData(projectsData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const displayValueOrHyphen = (value) => {
    return value ? value : '-';
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleSearch = (query) => {
    
    if(query==='')
    {
      setData(originalData)
    }
  else{
    const filteredData = data.filter((item) => {
      const projectInfo = `${item.Project.Title} ${item.Project.Technologies} ${item.Technical_Skillset.Backend} ${item.Technical_Skillset.Databases} ${item.Technical_Skillset.Infrastructure}`.toLowerCase();
      return projectInfo.includes(query.toLowerCase());
      });
    

    setData(filteredData);
  }
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <div className="projects-container">
        <div className="gallery">
          {data.map((item, index) => (
            <div
              key={index}
              className="project"
              onClick={() => handleProjectClick(item)}
            >
              <h2>Project {index + 1}</h2>
              <div className="field-name">Technologies:</div>
            <div className="field-value">{displayValueOrHyphen(item.Project.Technologies)}</div>
            
             <div className="field-name">Frontend:</div>
            <div className="field-value">{displayValueOrHyphen(item.Technical_Skillset.Frontend)}</div>
            
            <div className="field-name">Backend:</div>
           <div className="field-value">{displayValueOrHyphen(item.Technical_Skillset.Backend)}</div>
                       <div className="field-name">Databases:</div>
            <div className="field-value">{displayValueOrHyphen(item.Technical_Skillset.Databases)}</div>
            
          <div className="field-name">Infrastructure:</div>
           <div className="field-value">{displayValueOrHyphen(item.Technical_Skillset.Infrastructure)}</div>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <div className="project-details">
          <span className="close-button" onClick={handleCloseDetails}>
            X
          </span>
          <h2>Project Details</h2>
          <p>
            <strong>Title:</strong> {selectedProject.Project.Title}
          </p>
          <p>
            <strong>Technologies:</strong>{' '}
            {displayValueOrHyphen(selectedProject.Project.Technologies)}
          </p>
          <p>
            <strong>Frontend:</strong>{' '}
            {displayValueOrHyphen(selectedProject.Technical_Skillset.Frontend)}
          </p>
          <p>
            <strong>Backend:</strong>{' '}
            {displayValueOrHyphen(selectedProject.Technical_Skillset.Backend)}
          </p>
          <p>
            <strong>Databases:</strong>{' '}
            {displayValueOrHyphen(selectedProject.Technical_Skillset.Databases)}
          </p>
          <p>
            <strong>Infrastructure:</strong>{' '}
            {displayValueOrHyphen(selectedProject.Technical_Skillset.Infrastructure)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
