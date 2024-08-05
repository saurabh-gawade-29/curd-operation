import React, { useState, useEffect } from 'react';

function FamilyTableThree() {
  const [userInput, setUserInput] = useState('');
  const [users, setUsers] = useState([]);

  // Load users from localStorage on initial render
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('FamilyTableThree'));
    if (savedUsers) {
      setUsers(savedUsers);
    }
  }, []);

  // Save users to localStorage whenever the users array changes
  useEffect(() => {
    localStorage.setItem('FamilyTableThree', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAddUser = () => {
    // Parse input: assume format "FirstName LastName Age"
    const [firstName, lastName, age] = userInput.split('|');
    
    if (firstName && lastName && age) {
      const newUser = { firstName, lastName, age: parseInt(age, 10) };
      setUsers([...users, newUser]);
      setUserInput(''); // Clear input after adding user
    } else {
      alert('Please enter valid input: CAT. NO.	DESCRIPTION	STD. PACK');
    }
  };

  return (
    <div>
      <h1>ORDERING INFORMATION</h1>
      <input
        className='form-control'
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="CAT. NO.| DESCRIPTION | STD. PACK"
      />
      <button className='btn btn-danger my-2' onClick={handleAddUser}>Add</button>

      <table border="1"  class="table table-striped  table-bordered">
        <thead>
          <tr>
            <th>CAT. NO.</th>
            <th>DESCRIPTION</th>
            <th>STD. PACK</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FamilyTableThree;