import React, { useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

// const formSchema = yup.object().shape({
//   name: yup.string().required('Name is a required field'),
//   email: yup.string().email('Must be a valid email address').required('Must include email address'),
//   password: yup.string().required('Please enter a correct Password').min(6, 'Passwords must be at least 6 characters long.'),
//   terms: yup.boolean().oneOf([true], 'Please agree to terms of use')
// });

export default function Form() {
  const { register, handleSubmit, errors } = useForm();

  const [users, setUsers] = useState([]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: false
  });


  const inputChange = e => {
    e.persist();
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = e => {
    console.log('form submitted!', e);
    axios
      .post('https://reqres.in/api/users', formState)
      .then(res => {
        console.log('form submitted success', res);

        setUsers([...users, formState]);
        console.log('success', users);
        setFormState({
          name: '',
          email: '',
          password: '',
          terms: false
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <label htmlFor='name'>Name</label>
      <input ref={register({ required: true, minLength: 1 })} type='text' name='name' id='name' value={formState.name} onChange={inputChange} />
      {errors.name && <p>Please Enter Your Name</p>}
      <label htmlFor='email'>Email</label>
      <input ref={register({ required: true, minLength: 1 })} type='email' name='email' id='email' value={formState.email} onChange={inputChange} />
      {/* {errorState.email.length > 0 ? <p className='error'>{errorState.email}</p> : null} */}
      {errors.email && <p>Please Enter Your Email</p>}
      <label htmlFor='password'>Password</label>
      <input ref={register({ required: true, minLength: 6 })} type='password' name='password' id='password' value={formState.password} onChange={inputChange} />
      {/* {errorState.password.length > 6 ? <p className='error'>{errorState.password}</p> : null} */}
      {errors.password && errors.password.type === 'required' && <p>Please Enter Your Password</p>}
      {errors.password && errors.password.type === 'minLength' && <p>Min Length is 6 characters</p>}
      <label htmlFor='terms'>Terms & Conditions</label>
      <input ref={register({ required: true })} className= 'terms' type='checkbox' id='terms' name='terms' checked={formState.terms} onChange={inputChange} />
      {errors.terms && <p>Please Agree to Terms</p>}
      
      {/* {errorState.terms.length > 0 ? <p className='error'>{errorState.terms}</p> : null} */}
      <button>Submit</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </form>
  );
}
