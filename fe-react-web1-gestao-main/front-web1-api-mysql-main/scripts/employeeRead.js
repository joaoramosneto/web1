document.addEventListener('DOMContentLoaded', function () {


  function employeeTable() {
    axios.get("http://localhost:3001/employees")
      .then((response) => {
        const employees = response.data;
        const tbody = document.getElementById('employeeTable');
        tbody.innerHTML = '';

        employees.forEach((employee) => {
          const tr = document.createElement('tr');

         
          const tdNome = document.createElement('td');
          const link = document.createElement('a');
          link.textContent = employee.name;
         // link.href = './pages/employee.html?id=' + employee.id;
          tdNome.appendChild(link);

         
          const tdDepartamento = document.createElement('td');
          tdDepartamento.textContent = employee.department_name;

          
          const tdEditar = document.createElement('td');
          const editLink = document.createElement('a');
          editLink.textContent = 'Editar';
          editLink.href = `file:///C:/web1/fe-react-web1-gestao-main/front-web1-api-mysql-main/pages/employee/employeeUpdate.html?id=${employee.id}`;
          editLink.classList.add('edit-link');
          tdEditar.appendChild(editLink);

          
          const tdRemover = document.createElement('td');
          const removeLink = document.createElement('a');
          removeLink.textContent = 'Remover';
          removeLink.href = '#'; 
          //removeLink.href = '#'; 
          removeLink.classList.add('remove-link');

          
          removeLink.addEventListener('click', function (event) {
            event.preventDefault(); 

            if (confirm(`Tem certeza que deseja remover ${employee.name}?`)) {
              axios.delete(`http://localhost:3001/employees/${employee.id}`)
                .then(() => {
                  
                  alert(`Funcionário ${employee.name} removido com sucesso.`);
                  
                  employeeTable();
                })
                .catch((error) => {
                  console.error("Erro ao remover funcionário:", error);
                  alert(`Erro ao tentar remover o funcionário ${employee.name}. Verifique o console para mais detalhes.`);
                });
            }
          });

          tdRemover.appendChild(removeLink);

          
          tr.appendChild(tdNome);
          tr.appendChild(tdDepartamento);
          tr.appendChild(tdEditar);
          tr.appendChild(tdRemover);

         
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar funcionários:", error);
        alert("Erro ao carregar funcionários. Verifique o console para mais detalhes.");
      });
  }

  
  employeeTable();
});
