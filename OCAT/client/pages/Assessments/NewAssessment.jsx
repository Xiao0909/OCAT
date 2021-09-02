import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// import { useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to OCAT/client/services/AssessmentService.js and
  // then onto the OCAT/server/routes/AssessmentAPI express API
  const onSubmit = async (data) => { await AssessmentService.submit(data); };
  const { handleSubmit, register } = useForm();
  // const onSubmit = (data) => setResult(JSON.stringify(data));
  // const [ counter, setCounter ] = useState(0);
  // const score = () => { setCounter(counter + 1); };
  return <Form onSubmit={handleSubmit(onSubmit)}>
    <h1>Cat Behavioral Instrument</h1>
    {/* constant questions */}
    <div>
      <div>
        <p>Cat Name</p>
        <input {...register(`catName`, { maxLength: 10, required: true })} placeholder="Cat Name" />
      </div>
      <br />
      <div>
        <p>Cat Date of Birth</p>
        <input {...register(`birth`, { required: true })} placeholder="00/00/0000" />
      </div>
    </div>
    <hr />
    {/* choice questions */}
    <div>
      <div>
        <p>
          1. Previous contact with the Cat Judicial System
          <br />

          No (score = 0)<br />

          Yes (score = 1)<br />

          2. Physical altercations with other cats<br />

          0-3 altercations (score = 0)<br />

          3+ altercations (score = 1)<br />

          3. Physical altercations with owner (scratching, biting, etc...)<br />

          10+ altercations (score = 1)<br />

          0-10 altercations (score = 0)<br />

          4.  Plays well with dogs<br />

          No (score = 1)<br />

          Yes (score = 0)<br />

          5.  Hisses at strangers<br />

          Yes (score = 1)<br />

          No (score = 0)
        </p>
        <p>Your Score:</p>
        <input {...register(`score`, { required: true })} placeholder="Put Your Score Here" id="inputValue" />
      </div>

    </div>

    <br />
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
