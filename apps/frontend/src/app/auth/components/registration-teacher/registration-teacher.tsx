import React from 'react';

import './registration-teacher.scss';
import { CustomButton, Label } from '../../../shared/components';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/svg/Logo.svg';
import { useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface RegistrationTeacherProps {
  pathname: string;
}

export const RegistrationTeacher = (props: RegistrationTeacherProps) => {
  const { register, handleSubmit } = useForm();
  const options = ['CBSE', 'STATE BOARD'];
  const sector = ['Government', 'Private'];

  const onSubmit = (data) => {
    console.log(data);
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
              <Link
                to="/student-registration"
                className={
                  props.pathname === `/teacher-registration`
                    ? 'student_form mg_r'
                    : 'link_btn'
                }
              >
                Teacher
              </Link>
            </div>
            <div>
              <Link to="/student-registration" className="link_btn">
                Student
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Username <span className="tomato">*</span>
          </Label>
          <input
            ref={register}
            className="form-control "
            placeholder="Enter your name"
            type="text"
            name="username"
          />
        </div>
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Teaching Sector <span className="tomato">*</span>
          </Label>
          <select className="form-control" name="sector" ref={register}>
            {sector.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Email ID <span className="tomato">*</span>
          </Label>
          <input
            ref={register}
            className="form-control "
            placeholder="Enter your email address"
            type="email"
            name="email"
          />
        </div>
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Phone <span className="tomato">*</span>
          </Label>
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
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Class <span className="tomato">*</span>
          </Label>
          <input
            ref={register}
            className="form-control "
            placeholder="Enter your class"
            type="text"
            name="class"
          />
        </div>
        <div className="tb_cell">
          <Label>
            {' '}
            Board of education <span className="tomato">*</span>
          </Label>
          <select
            className="form-control"
            name="board_of_education"
            ref={register}
          >
            {options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Subject Handled <span className="tomato">*</span>
          </Label>
          <input
            ref={register}
            className="form-control "
            placeholder="Enter your subject"
            type="text"
            name="subject"
          />
        </div>
        <div className="tb_cell  input_width_teacher">
          <Label>
            {' '}
            Password <span className="tomato">*</span>
          </Label>
          <input
            ref={register}
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
      </div>

      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <CustomButton type="submit" className="register_btn mg_r">
            {' '}
            Register as Teacher
          </CustomButton>
        </div>
        <div className="tb_cell input_width_teacher">
          <CustomButton className="register_btn mg_r">
            {' '}
            Already have an account ? Sign In
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default RegistrationTeacher;
