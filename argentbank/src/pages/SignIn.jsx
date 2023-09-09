import React from 'react';
import Form from '../containers/Form'
import Header from '../containers/Header';


  function SignIn  () {

  return (
    <div className="form_container">
      <Header />
      <main className="main bg-dark"> 
          <Form />
      </main>
    </div>
  );
}

export default SignIn