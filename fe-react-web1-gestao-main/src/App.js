import { useState, useEffect } from "react";
import api from "./services/api";

import "./css/global.css";
import "./css/app.css";
import "./css/sidebar.css";
import "./css/main.css";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeItem from "./components/EmployeeItem";

function App() {
  const [employeesList, setEmployeesList] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees");
        setEmployeesList(response.data);
      } catch (error) {
        console.log("Erro ao buscar funcionários", error);
      }
    };
    fetchEmployees();
  }, [employees]);

  async function handleAddEmployee(data) {
    const response = await api.post("/employees", data);
    setEmployees([...employees, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastro de Funcionário</strong>
        <EmployeeForm onSubmit={handleAddEmployee} />
      </aside>
      <main>
        <ul>
          {employeesList.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
