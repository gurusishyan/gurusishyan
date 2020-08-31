import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import './registration-student.scss';
import { Label, CustomButton, Spinner } from '../../../shared/components';
import Logo from '../../../../assets/svg/Logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { requestingStudentRegistration } from '../../../store/registration-store/actions/student-actions';
import { StudentDetails } from '@gurusishyan/request-interface';
import { RootState } from '../../../store/root-reducer';
import { environment } from 'apps/frontend/src/environments/environment';

export interface RegistrationStudentProps {
  pathname: string;
}

const RegistrationStudent = (props: RegistrationStudentProps) => {
  const dispatch = useDispatch();
  const historyParams = useHistory();
  const loaderState = useSelector((state: RootState) => state.loader.isLoading);
  const { register, handleSubmit, errors } = useForm();
  const options = [
    { label: 'CBSE', value: 'cbse' },
    { label: 'State Board', value: 'state_board' },
  ];

  const onSubmit = (data: StudentDetails) => {
    dispatch(requestingStudentRegistration(data, historyParams));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="student_teacher_form">
      <div className="tb_row">
        <div className="tb_cell">
          <img src={Logo} />
          <p className="dark_blue register_title"> Registration </p>
          <div className="line_2"></div>
        </div>
        <div className="tb_cell">
          <div className="reg_bt">
            <div>
              <Link to="/teacher-registration" className="link_btn mg_r">
                Teacher
              </Link>
            </div>
            <div>
              <Link
                to="/student-registration"
                className={
                  props.pathname === `/student-registration`
                    ? 'student_form mg_r'
                    : 'link_btn'
                }
              >
                Student
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Username <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <div>
            <div>
              <input
                ref={register({ minLength: 4 })}
                className="form-control"
                placeholder="Enter your name"
                type="text"
                name="user_name"
                required
              />
            </div>
            {errors.user_name && errors.user_name.type === 'minLength' && (
              <small className="red_text">
                {' '}
                Username must contain atleast 4 characters
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Class <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <select
            ref={register}
            className="form-control"
            placeholder="Enter your class"
            name="class_studying"
            required
          >
            {environment.classes.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Email ID <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <input
            ref={register}
            className="form-control"
            placeholder="Enter your email address"
            type="email"
            name="user_email"
            required
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Phone <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <div>
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                +91
              </span>
              <input
                ref={register({ required: true, minLength: 10, maxLength: 10 })}
                name="phone"
                type="number"
                className="form-control"
                placeholder="Enter your phone number"
                aria-describedby="basic-addon1"
                required
              />
            </div>
            {errors.phone &&
              (errors.phone.type || errors.phone.type === 'maxLength') && (
                <small className="red_text">
                  Invalid Mobile Number, must contain 10 numbers{' '}
                </small>
              )}
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Board of Education <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <select
            className="form-control"
            name="board_of_education_student"
            ref={register}
          >
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label>
            {' '}
            Password <span className="tomato">*</span>
          </Label>
        </div>
        <div className="tb_cell">
          <div>
            <div>
              <input
                ref={register({
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                })}
                className="form-control"
                type="password"
                placeholder="Enter your password"
                name="password"
                autoComplete="off"
                required
              />
            </div>
            {!errors.password && (
              <small>
                8 characters, atleast 1 letter,1 number & 1 special character
              </small>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <small className="red_text">
                Minimum eight characters, at least one letter, one number and
                one special character
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <CustomButton type="submit" className="register_btn mg_r">
            {' '}
            {loaderState ? <Spinner /> : 'Register as Student'}
          </CustomButton>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <div className="account_">
            {' '}
            Already have an account?{' '}
            <span className="light_blue">
              {' '}
              <Link style={{ textDecoration: 'none  ' }} to="/">
                {' '}
                Sign In{' '}
              </Link>
            </span>{' '}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationStudent;
