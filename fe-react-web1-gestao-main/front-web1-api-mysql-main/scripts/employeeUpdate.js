document.addEventListener('DOMContentLoaded', function () {
    const employeeForm = document.getElementById('employeeForm');
  
    
    function populateDepartmentsSelect() {
      const departmentSelect = document.getElementById('department');
  
      axios.get('http://localhost:3001/departments')
        .then(response => {
          const departments = response.data;
  
          departmentSelect.innerHTML = ""; 
  
          departments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.name;
            departmentSelect.appendChild(option);
          });
  
          
          loadEmployeeData();
        })
        .catch(error => {
          console.error('Erro ao carregar departamentos:', error);
        });
    }
  
    
    function loadEmployeeData() {
      const urlParams = new URLSearchParams(window.location.search);
      const employeeId = urlParams.get('id');
  
      axios.get(`http://localhost:3001/employees/${employeeId}`)
        .then(response => {
          const employee = response.data;
  
          document.getElementById('name').value = employee.name;
          document.getElementById('email').value = employee.email;
          document.getElementById('position').value = employee.position;
          document.getElementById('salary').value = employee.salary;
          document.getElementById('transportAllowance').checked = employee.transportAllowance;
          document.getElementById('department').value = employee.department_id;
        })
        .catch(error => {
          console.error('Erro ao carregar dados do funcionário:', error);
        });
    }
  
    
    populateDepartmentsSelect();
  
   
    employeeForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const employeeId = new URLSearchParams(window.location.search).get('id');
  
      const formData = new FormData(employeeForm);
      const updatedEmployee = {
        name: formData.get('name'),
        email: formData.get('email'),
        position: formData.get('position'),
        salary: parseFloat(formData.get('salary')),
        transportAllowance: formData.get('transportAllowance') === 'on',
        department_id: formData.get('department')
      };
  
      axios.put(`http://localhost:3001/employees/${employeeId}`, updatedEmployee)
        .then(response => {
          alert('Funcionário atualizado com sucesso!');
          
          window.location.href = 'C:/web1/fe-react-web1-gestao-main/front-web1-api-mysql-main/pages/employee/employeeRead.html';

        })
        .catch(error => {
          console.error('Erro ao atualizar funcionário:', error);
        });
    });
  });
  