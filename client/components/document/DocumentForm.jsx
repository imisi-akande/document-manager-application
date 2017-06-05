import {Row, Input} from 'react-materialize';
import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';
import TextInput from '../../components/document/TextInput';


const DocumentForm = ({ document, onChange, onSave, errors }) => (
<form>
	<div className="row container">
		<div className="input-field col s4">

			<TextInput
				name="title"
				label="Title"
				defaultvalue={document.title}
				onChange={onChange}
				error={errors} />
				<label htmlFor="title">Title</label>

		</div>

		<br />

		<div className="right col s4">

			<Input
				s={6}
				type="select"
				name="access"
				label="Access"
				onChange={onChange}>
				<option value="public">Public</option>
				<option value="private">Private</option>
				<option value="role">Role</option>
			</Input>
			
		</div>
	</div>
	</form>
);

export default DocumentForm;