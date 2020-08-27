import React, { useState } from 'react';

import './registration-teacher.scss';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  CustomButton,
  Label,
  DropdownComponent,
  Spinner,
} from '../../../shared/components';
import Logo from '../../../../assets/svg/Logo.svg';
import { requestingTeacherRegistration } from '../../../store/registration-store/actions/teacher-actions';
import { TeacherDetails } from '@gurusishyan/request-interface';
import { environment } from 'apps/frontend/src/environments/environment';
import { RootState } from '../../../store/root-reducer';

/* eslint-disable-next-line */
export interface RegistrationTeacherProps {
  pathname: string;
}

export const RegistrationTeacher = (props: RegistrationTeacherProps) => {
  const [classes, setClasses] = useState([]);
  const loaderState = useSelector((state: RootState) => state.loader.isLoading);
  const [subjects, setSubjects] = useState([]);
  const [sector, setSector] = useState([]);
  const [board_of_education, set_board_of_education] = useState([]);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: TeacherDetails) => {
    data['subjects_handled'] = valuesFromDropDown(subjects);
    data['classes_handled'] = valuesFromDropDown(classes);
    data['teaching_sector'] = sector['value'];
    data['board_of_education_teacher'] = valuesFromDropDown(board_of_education);
    data['teacher'] = true;
    dispatch(requestingTeacherRegistration(data));
  };

  const valuesFromDropDown = (values_array) =>
    values_array.map((selected_values) => selected_values.value);

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
            Classes Handled <span className="tomato">*</span>
          </Label>
          <DropdownComponent
            isMulti={true}
            closeMenuOnSelect={false}
            selected_options={classes}
            onChange={setClasses}
            options={environment.classes}
            placeholder="Enter your classes"
          />
        </div>
        <div className="tb_cell">
          <Label>
            {' '}
            Subjects Handled <span className="tomato">*</span>
          </Label>
          <DropdownComponent
            isMulti={true}
            closeMenuOnSelect={false}
            selected_options={subjects}
            onChange={setSubjects}
            options={environment.subjects}
            placeholder="Enter your subjects"
          />
        </div>
      </div>

      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <Label>
            {' '}
            Teaching Sector <span className="tomato">*</span>
          </Label>
          <DropdownComponent
            isMulti={false}
            closeMenuOnSelect={true}
            selected_options={sector}
            onChange={setSector}
            options={environment.sector}
            placeholder="Enter your sector"
          />
        </div>
        <div className="tb_cell">
          <Label>
            {' '}
            Board of education <span className="tomato">*</span>
          </Label>
          <DropdownComponent
            isMulti={true}
            closeMenuOnSelect={false}
            selected_options={board_of_education}
            onChange={set_board_of_education}
            options={environment.board_of_education}
            placeholder="Enter your sector"
          />
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
            name="user_name"
          />
        </div>
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
            name="user_email"
          />
        </div>
      </div>

      <div className="tb_row">
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
            autoComplete="off"
          />
        </div>
      </div>

      <div className="tb_row">
        <div className="tb_cell input_width_teacher">
          <CustomButton type="submit" className="register_btn mg_r">
            {' '}
            {loaderState ? <Spinner /> : 'Register as Teacher'}
          </CustomButton>
        </div>
        <div className="tb_cell input_width_teacher">
          <CustomButton className="register_btn mg_r">
            {' '}
            Already have an account ?{' '}
            <Link style={{ color: 'white  ' }} to="/">
              {' '}
              Sign In{' '}
            </Link>
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default RegistrationTeacher;
