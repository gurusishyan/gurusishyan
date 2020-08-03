import React from 'react';
import { useForm } from 'react-hook-form';

interface hooksForm {
  defaultValues?: any;
  children?: any;
  onSubmit?: any;
}

interface formValues {
  name: string;
  register?: any;
  options?: any;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const Form = ({ defaultValues, children, onSubmit }: hooksForm) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export const Input = ({ register, name, ...rest }: formValues) => {
  return <input name={name} ref={register} {...rest} />;
};

export const Dropdown = ({ register, options, name, ...rest }: formValues) => {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
