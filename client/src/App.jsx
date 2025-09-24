import { useState, useEffect } from 'react'; // <-- Step 1: Import Hooks

function App() {
  // Step 2: Set up a state "whiteboard" to hold our projects
  const [projects, setProjects] = useState([]);

  // Step 3: Set up an effect to run once when the component loads
  useEffect(() => {
    // We will fetch data from our API inside here
    fetch('http://localhost:5100/api/projects')
      .then(response => response.json()) // Parse the JSON from the response
      .then(data => setProjects(data)); // Set the data into our state
  }, []); // The empty array means this effect runs only once

  return (
    <div>
      <h1>Welcome to the Enclope Foundry</h1>
      
      {/* Step 4: Display the projects */}
      <div>
        {projects.map(project => (
          <div key={project._id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default App