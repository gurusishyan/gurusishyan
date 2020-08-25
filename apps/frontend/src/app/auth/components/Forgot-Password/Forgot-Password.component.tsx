import React, { useEffect } from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';

import './Forgot-Password.styles.css';
import {
  requestingPasswordReset,
  closeModal,
} from '../../../store/auth-store/actions/reset-password.actions';
import { RootState } from '../../../store/root-reducer';
import { Spinner } from '../../../shared/components';

const ForgotPassword = (props) => {
  const forgot_password = useSelector(
    (state: RootState) => state.resetPassword
  );
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onEmailSubmitted = (data) => {
    dispatch(requestingPasswordReset(data.user_email));
  };

  return (
    <div>
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
        <form>
          <Modal.Body className="show-grid">
            <Row>
              <Col className="text-center" xs={12} md={12}>
                <span className="email_text">
                  {' '}
                  Please enter your email and we will send you a link to reset
                  your password
                </span>
              </Col>
            </Row>
            <Row className="mgt_1">
              <Col style={{ margin: 'auto' }} xs={12} md={7}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FaUserCircle />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    ref={register}
                    placeholder="Email address"
                    aria-label="Email address"
                    name="user_email"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit(onEmailSubmitted)}>
              {forgot_password.requesting ? <Spinner /> : 'Send'}
            </Button>
            <Button onClick={() => dispatch(closeModal())}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
