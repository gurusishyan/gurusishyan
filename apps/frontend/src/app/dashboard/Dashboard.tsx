import React from 'react';
import { CustomButton } from '../shared/components';
import { useDispatch } from 'react-redux';
import { userLogoutRequest } from '../store/auth-store/actions/login.actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const onLogoutClicked = () => {
    localStorage.removeItem('token');
    dispatch(userLogoutRequest());
  };

  return (
    <div>
      Welcome to Dashboard
      <CustomButton onClick={onLogoutClicked} className="btn btn-primary">
        {' '}
        Logout
      </CustomButton>
    </div>
  );
};

export default Dashboard;
