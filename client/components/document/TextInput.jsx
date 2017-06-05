import React, { PropTypes } from 'react';

const TextInput = ({ name, label, onChange, error, type }) => {
  let wrapperClass = 'row';
  if (error && error.length > 0) {
    wrapperClass += ' ' + 'has-error';
  } 
  return (
		<main>
			<center>
				<div className="row">
					<div className=" col s12">
						<div className={wrapperClass}>
							<label htmlFor={name}>{label}</label>
							<div className="input-field">
								<input
									type={type}
									name={name}
									className=""
									onChange={onChange} />

							</div>
						</div>
					</div>
				</div>
			</center>
		</main>
  );
};
export default TextInput;