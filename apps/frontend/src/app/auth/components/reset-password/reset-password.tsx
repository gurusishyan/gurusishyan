import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import './reset-password.scss';
import { errorToast } from '../../../utils/toast';
import { resetPasswordRequest } from '../../../store/auth-store/actions/reset-password.actions';

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const params = useParams();
    console.log(params);
    const { password, confirm_password } = data;
    if (password === confirm_password) {
      dispatch(resetPasswordRequest(password));
    } else {
      errorToast('Passwords do not match');
    }
  };

  return (
    <div className="reset_password_container">
      <div>
        <Card>
          <Card.Body>
            <div className="text-center mb-5">
              <p className="dark_blue"> Reset your password</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup className="mb-5">
                <FormControl
                  ref={register}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon1">
                    {showPassword ? (
                      <AiFillEyeInvisible
                        className="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <AiFillEye
                        className="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>

              <InputGroup className="mb-5">
                <FormControl
                  ref={register}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirm_password"
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon1">
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible
                        className="pointer"
                        onClick={() =>
                          setshowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <AiFillEye
                        className="pointer"
                        onClick={() =>
                          setshowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <div className="text-center">
                <Button className="text-center" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
