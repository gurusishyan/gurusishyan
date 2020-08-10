import React from 'react';
import { useLocation } from 'react-router-dom';

import Student_Registration from '../../../../assets/svg/Student_Registration.svg';
import Teacher_Registration from '../../../../assets/svg/Teacher_Registration.svg';
import RegistrationStudent from '../../components/registration-student/registration-student';
import RegistrationTeacher from '../../components/registration-teacher/registration-teacher';
import './Registration.styles.scss';

const RegistrationContainer = () => {
  let location = useLocation().pathname;
  return (
    <div className="student_main_ctn">
      <div className="main_ctn_1">
        {location === '/student-registration' ? (
          <RegistrationStudent pathname={location} />
        ) : (
          <RegistrationTeacher pathname={location} />
        )}
      </div>
      <div className="main_ctn_2">
        <img
          className="student_image"
          src={
            location === `/student-registration`
              ? Student_Registration
              : Teacher_Registration
          }
          alt="student"
        />
      </div>
    </div>
  );
};

export default RegistrationContainer;
