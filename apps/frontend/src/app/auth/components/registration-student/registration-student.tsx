import React from 'react';

import './registration-student.scss';
import { Label, CustomButton } from '../../../shared/components';
import { Input, Dropdown } from '../../../shared/components/HooksForm';
import Logo from '../../../../assets/svg/Logo.svg';
import { Link } from 'react-router-dom';

const RegistrationStudent = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className="student_form">
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
              <Link to="/student-registration" className="link_btn">
                Student
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label> Username *</Label>
        </div>
        <div className="tb_cell">
          <Input
            className="form-control"
            placeholder="Enter your name"
            type="email"
            name="email"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label> Class *</Label>
        </div>
        <div className="tb_cell">
          <Input
            className="form-control"
            placeholder="Enter your class"
            type="class"
            name="class"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label> Email ID *</Label>
        </div>
        <div className="tb_cell">
          <Input
            className="form-control"
            placeholder="Enter your email address"
            type="email"
            name="email"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label> Phone *</Label>
        </div>
        <div className="input-group tb_cell">
          <div>
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                +91
              </span>
              <input
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
          <Label> Board of Education *</Label>
        </div>
        <div className="tb_cell">
          <Dropdown
            className="form-control"
            name="board_of_education"
            options={['CBSE', 'STATE_BOARD']}
            placeholder="Education"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell">
          <Label> Password *</Label>
        </div>
        <div className="tb_cell">
          <Input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <CustomButton className="register_btn mg_r">
            {' '}
            Register as Student
          </CustomButton>
        </div>
      </div>
      <div className="tb_row">
        <div className="tb_cell"></div>
        <div className="tb_cell">
          <p className="account_">
            {' '}
            Already have an account?{' '}
            <span className="light_blue"> Sign In</span>{' '}
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegistrationStudent;
