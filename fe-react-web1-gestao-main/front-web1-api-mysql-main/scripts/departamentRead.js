
document.addEventListener('DOMContentLoaded', function () {

 
  function departmentTable() {
    axios.get("http://localhost:3001/departments")
      .then((response) => {
        const departments = response.data;
        const tbody = document.getElementById('departmentTable');
        tbody.innerHTML = '';

        departments.forEach((department) => { 
          const tr = document.createElement('tr');

         
          const tdNome = document.createElement('td');
          const link = document.createElement('a');
          link.textContent = department.name; 
          link.href = `C:/web1/fe-react-web1-gestao-main/front-web1-api-mysql-main/pages/department/departmentDetail.html?id=${department.id}`;
          tdNome.appendChild(link);

          
          const tdDescricao = document.createElement('td');
          tdDescricao.textContent = department.description; 

          
          const tdEditar = document.createElement('td');
          const editLink = document.createElement('a');
          editLink.textContent = 'Editar';
          editLink.href = `C:/web1/fe-react-web1-gestao-main/front-web1-api-mysql-main/pages/department/departmentUpdate.html?id=${department.id}`;
          editLink.classList.add('edit-link');
          tdEditar.appendChild(editLink);

         
          const tdRemover = document.createElement('td');
          const removeLink = document.createElement('a');
          removeLink.textContent = 'Remover';
          removeLink.href = '#'; 
          removeLink.classList.add('remove-link');

         
          removeLink.addEventListener('click', function (event) {
            event.preventDefault(); 

            if (confirm(`Tem certeza que deseja remover ${department.name}?`)) {
              axios.delete(`http://localhost:3001/departments/${department.id}`)
                .then(() => {
                 
                  alert(`Departamento ${department.name} removido com sucesso.`);
                 
                  departmentTable();
                })
                .catch((error) => {
                  console.error("Erro ao remover departamento:", error);
                  alert(`Erro ao tentar remover o departamento ${department.name}. Verifique o console para mais detalhes.`);
                });
            }
          });

          tdRemover.appendChild(removeLink);

          
          tr.appendChild(tdNome);
          tr.appendChild(tdDescricao); 
          tr.appendChild(tdEditar);
          tr.appendChild(tdRemover);

         
          tbody.appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar departamentos:", error);
        alert("Erro ao carregar departamentos. Verifique o console para mais detalhes.");
      });
  }

  
  departmentTable();
});
