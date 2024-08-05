import React, { useState, useEffect } from 'react';

const FamilyTableNew = () => {
  const [family, setFamily] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMother, setIsMother] = useState(true);

  useEffect(() => {
    const storedFamily = localStorage.getItem('familyDataNew');
    if (storedFamily) {
      setFamily(JSON.parse(storedFamily));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('familyDataNew', JSON.stringify(family));
  }, [family]);

  const handleAdd = () => {
    if (inputValue.trim() === '') return;

    if (isMother) {
      setFamily([...family, { mother: inputValue, father: '' }]);
    } else {
      const updatedFamily = family.map((entry, index) =>
        index === family.length - 1 ? { ...entry, father: inputValue } : entry
      );
      setFamily(updatedFamily);
    }

    setInputValue('');
    setIsMother(!isMother);
  };

  return (
    <div className='container'>
      <h2>CONNECTION DATA</h2>
      <input
        className="form-control"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={isMother ? "Enter Title" : "Enter Value"}
      />
      <button onClick={handleAdd} className='btn btn-danger my-2'>Add</button>
      <table border="1"  class="table table-striped  table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {family.map((entry, index) => (
            <tr key={index}>
              <td>{entry.mother}</td>
              <td>{entry.father}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyTableNew;