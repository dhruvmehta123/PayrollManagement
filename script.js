// Add employee
document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emp_id = document.getElementById('emp_id').value;
    const emp_name = document.getElementById('emp_name').value;
    const dept_id = document.getElementById('dept_id').value;
    const hire_date = document.getElementById('hire_date').value;
    
    fetch('http://localhost:3000/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_id, emp_name, dept_id, hire_date })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('result').textContent = data.message;
    })
    .catch(err => console.error(err));
});

// Update employee
document.getElementById('updateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emp_id = document.getElementById('update_emp_id').value;
    const new_emp_name = document.getElementById('new_emp_name').value;
    
    fetch(`http://localhost:3000/employee/${emp_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_name: new_emp_name })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('result').textContent = data.message;
    })
    .catch(err => console.error(err));
});

// Delete employee
document.getElementById('deleteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emp_id = document.getElementById('delete_emp_id').value;
    
    fetch(`http://localhost:3000/employee/${emp_id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('result').textContent = data.message;
    })
    .catch(err => console.error(err));
});

// Search employee by ID
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const emp_id = document.getElementById('search_emp_id').value;
    
    fetch(`http://localhost:3000/employee/${emp_id}`)
    .then(res => res.json())
    .then(data => {
        if (data.employee) {
            document.getElementById('result').textContent = 
                `ID: ${data.employee.emp_id}, Name: ${data.employee.emp_name}, Dept: ${data.employee.dept_id}, Hire Date: ${data.employee.hire_date}`;
        } else {
            document.getElementById('result').textContent = 'Employee not found';
        }
    })
    .catch(err => console.error(err));
});

