import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import './SignUp.css';
import registerUserWithEmailAndPassword from './firebase';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUserWithEmailAndPassword(email, password);
      // Registration successful, handle next steps like redirecting to another page or displaying a success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: `url(https://cdn.pixabay.com/photo/2022/10/19/14/53/sunset-7532726_1280.jpg)`}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          {error && <div className="text-danger mb-3">{error}</div>}
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleRegister}>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
