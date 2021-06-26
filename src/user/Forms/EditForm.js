import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';

const url = 'http://localhost:8080/api/employees';
const editUrl = 'http://localhost:8080/api/edit/employees';

const types = [
    'Manager',
    'Junior',
    'Senior'
];

function EditForm(props) {
  const [employee, setEmployee] = useState({
    fullName: '',
    type: '',
    phoneNumber: '',
    daysInMonth: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${url}/${props.match.params.id}`)
      .then(response =>
        setEmployee({
          ...employee,
            fullName: response.data.data.fullName,
            phoneNumber: response.data.data.phoneNumber,
            type: response.data.data.type,
            daysInMonth: response.data.data.daysInMonth,
        }),
      )
      .catch(err => setErrorMessage('Fetch error. API is not available.'));
    console.log(errorMessage);
  }, []);

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

  const onClickSubmit = () => {
    axios
      .patch(`${editUrl}/${props.match.params.id}`, employee)
      .then(response => console.log(response.data.data));
    closeForm();
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <H6>
              Please change the information below to update employee
              details then click the save button.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Edit Employee</StyledCardHeader>
              <Card.Body>
                <Form>
                  <Form.Group controlId="editFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      required
                      name="fullName"
                      placeholder="Please enter full name"
                      value={employee.fullName}
                      onChange={onChangeFullName}
                    />
                  </Form.Group>
                  <Form.Group controlId="editPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      name="PhoneNumber"
                      placeholder="Please enter Phone Number"
                      value={employee.phoneNumber}
                      onChange={onChangePhoneNumber}
                    />
                  </Form.Group>
                  <Form.Group controlId="editType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      required
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
                  <Form.Group controlId="editDaysInMonthr">
                    <Form.Label>Days In Month</Form.Label>
                    <Form.Control
                      required
                      name="daysInMonth"
                      placeholder="Please enter days In Month"
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
                    size="sm"
                    onClick={() => onClickSubmit()}
                    disabled={isInputFieldEmpty()}
                  >
                    Submit
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
  background-color: #eea33b;
  color: #ffffff;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
`;

export default EditForm;
