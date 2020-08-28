import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import './registration-student.scss';
import { Label, CustomButton } from '../../../shared/components';
import Logo from '../../../../assets/svg/Logo.svg';
import { Link } from 'react-router-dom';
import { requestingStudentRegistration } from '../../../store/registration-store/actions/student-actions';
import { StudentDetails } from '@gurusishyan/request-interface';
import { environment } from 'apps/frontend/src/environments/environment';

export interface RegistrationStudentProps {
  pathname: string;
}

const RegistrationStudent = (props: RegistrationStudentProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const options = [
    { label: 'CBSE', value: 'cbse' },
    { label: 'State Board', value: 'state_board' },
  ];

  const onSubmit = (data: StudentDetails) => {
    dispatch(requestingStudentRegistration(data));
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
          <input
            ref={register}
            className="form-control"
            placeholder="Enter your name"
            type="text"
            name="user_name"
          />
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
                ref={register}
                name="phone"
                type="number"
                className="form-control"
                placeholder="Enter your phone number"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
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
          <input
            ref={register}
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="password"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <CustomButton type="submit" className="register_btn mg_r">
            {' '}
            Register as Student
          </CustomButton>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <div className="account_">
            {' '}
            Already have an account?{' '}
            <span className="light_blue"> Sign In</span>{' '}
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationStudent;
