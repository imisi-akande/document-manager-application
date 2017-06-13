import { Input } from 'react-materialize';
import React from 'react';
import TextInput from '../../components/document/TextInput';


const DocumentForm = ({ document, onChange, errors }) => (
  <form>
    <div className="row container">
      <div className="input-field col s4">

        <TextInput
          name="title"
          label="Title"
          defaultvalue={document.title}
          onChange={onChange}
          error={errors}
        />
        <label htmlFor="title">Title</label>

      </div>

      <br />

      <div className="right col s4">

        <Input
          s={6}
          type="select"
          name="access"
          label="Access"
          onChange={onChange}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="role">Role</option>
        </Input>

      </div>
    </div>
  </form>
);
DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
};
export default DocumentForm;
