
function handleSubmit(event) {
  event.preventDefault();


  const formData = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value
  };

  console.log(formData);


  if (confirm('Tem certeza que deseja salvar este departamento?')) {
    
    axios
      .post("http://localhost:3001/departments", formData)
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  } else {
   
    return false;
  }
}


document.getElementById("departmentForm").addEventListener("submit", handleSubmit);
