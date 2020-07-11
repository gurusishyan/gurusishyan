import React from 'react';

import './registration-student.scss';
import { CustomButton } from '../../../shared/components';
import {
  Dropdown,
  Form,
  Input,
} from '../../../shared/components/dropdown/HooksForm';

const RegistrationStudent = () => {
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input
          type="string"
          name="username"
          placeholder="Enter your username"
        />
        <Input type="string" name="class" placeholder="Enter your class" />
        <Input type="email" name="email" placeholder="Enter your email" />
        <Input
          type="number"
          name="phone"
          placeholder="Enter your phone number"
        />
        <Dropdown
          name="board_of_education"
          options={['CBSE', 'STATE_BOARD']}
          placeholder="Education"
        />
        <Input name="password" type="password" placeholder="password" />

        <CustomButton className="btn btn-success" type="submit" value="Submit">
          Submit
        </CustomButton>
      </Form>
    </div>
  );
};

export default RegistrationStudent;
