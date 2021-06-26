/* eslint-disable import/prefer-default-export */
const filterHandler = (event, employees, changeHandler) => {
    const filterEmployees = employees.filter(employee => {
      const employeeNameLowerCase = employee.startDate;
      const queryLowerCase = event.target.value;
      return employeeNameLowerCase.includes(queryLowerCase);
    });
  
    changeHandler({ name: 'filterEmployees', value: filterEmployees });
    changeHandler({ name: 'filterValue', value: event.target.value });
  };
  
  export { filterHandler };