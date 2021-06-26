import React, { useState } from 'react';
import { Row, Col, Form, Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const addUrl = 'http://localhost:8080/api/add/employees/';

const types = [
  'Manager',
  'Junior',
  'Senior'
];


function AddForm() {
  const [employee, setEmployee] = useState({
    fullName: '',
    type: '',
    phoneNumber: '',
    daysInMonth: '',
    currentMonthSalary: ''
  });

  const onChangeFullName = event => {
    setEmployee({
      ...employee,
      fullName: event.target.value,
    });
  };

  const onChangeType = event => {
    setEmployee({
      ...employee,
      type: event.target.value,
    });
  };

  const onChangePhoneNumber = event => {
    setEmployee({
      ...employee,
      phoneNumber: event.target.value,
    });
  };

  const onChangeDaysInMonth = event => {
    setEmployee({
      ...employee,
      daysInMonth: event.target.value,
      });
  };

  const isInputFieldEmpty = () => {
    return (
      employee.full === '' ||
      employee.phoneNumber === '' ||
      employee.daysInMonth === '' ||
      employee.type === ''
    );
  };

  const handleSubmit = () => {
    axios.post(addUrl, employee).then(res => {
      console.log(res.data.data);
      closeForm();
    });
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <H6>
              Please fill out the form to add an employee and then click
              the save button.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Add Employee</StyledCardHeader>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="addFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="fullName"
                      placeholder="Please enter Full Name"
                      value={employee.fullName}
                      onChange={onChangeFullName}
                    />
                  </Form.Group>
                  <Form.Group controlId="addPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="phoneNumber"
                      placeholder="Please enter Phone Number title"
                      value={employee.phoneNumber}
                      onChange={onChangePhoneNumber}
                    />
                  </Form.Group>
                  <Form.Group controlId="addType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="type"
                      as="select"
                      value={employee.type}
                      onChange={onChangeType}
                    >
                      {types.map(type => (
                        <option key={type}>{type}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="addDaysInMonth">
                    <Form.Label>Days In Month</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="daysInMonth"
                      placeholder="Please enter Days In Month title"
                      value={employee.daysInMonth}
                      onChange={onChangeDaysInMonth}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => closeForm()}
                  >
                    Cancel
                  </Button>
                  <StyledButton
                    className="style-button"
                    size="sm"
                    type="submit"
                    disabled={isInputFieldEmpty()}
                  >
                    Save
                  </StyledButton>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
`;

const H6 = styled.h6`
  margin-bottom: 10px;
  color: #858484;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #3277b2;
  color: #ffffff;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
`;

export default AddForm;
