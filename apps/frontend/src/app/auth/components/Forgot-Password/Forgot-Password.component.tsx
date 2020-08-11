import React from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import './Forgot-Password.styles.css';
import { AiOutlineLock } from 'react-icons/ai';

const ForgotPassword = (props) => {
  const { register, handleSubmit } = useForm();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="reset_password"> Reset Password </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Row>
          <Col className="text-center" xs={12} md={12}>
            <span className="email_text">
              {' '}
              Please enter your email and we will send you a link to reset your
              password
            </span>
          </Col>
        </Row>
        <Row className="mgt_1">
          <Col style={{ margin: 'auto' }} xs={12} md={7}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Send</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPassword;
