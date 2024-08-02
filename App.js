import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const result = await axios.post('https://your-backend-url/bfhl', { data: parsedData });
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse(null);
    }
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions(prev => checked ? [...prev, value] : prev.filter(option => option !== value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;

    return (
      <div>
        {selectedOptions.includes('Numbers') && <div><strong>Numbers:</strong> {numbers.join(', ')}</div>}
        {selectedOptions.includes('Alphabets') && <div><strong>Alphabets:</strong> {alphabets.join(', ')}</div>}
        {selectedOptions.includes('Highest alphabet') && <div><strong>Highest Alphabet:</strong> {highest_alphabet.join(', ')}</div>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON data'
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label><input type="checkbox" value="Numbers" onChange={handleOptionChange} /> Numbers</label>
        <label><input type="checkbox" value="Alphabets" onChange={handleOptionChange} /> Alphabets</label>
        <label><input type="checkbox" value="Highest alphabet" onChange={handleOptionChange} /> Highest Alphabet</label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
