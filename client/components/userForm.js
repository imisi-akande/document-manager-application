import React from 'react';
import TextInput from '../components/TextInput';

const UserForm = ({ user, onSave, onChange, loading, errors }) => (
	
		<div className="container" style={{ width : 700 }}>
			<div className="z-depth-1 grey lighten-4">
				<form method="POST" className="" style={{ width: '95%', marginLeft: '20px' }}>
					<TextInput
						type="text"
						name="firstName"
						label="firstName"
						defaultvalue={user.firstName}
						onChange={onChange}
						error={errors} />
					<TextInput
						type="text"
						name="lastName"
						label="LastName"
						defaultvalue={user.lastName}
						onChange={onChange}
						error={errors} />
					<TextInput
						type="text"
						name="userName"
						label="userName"
						defaultvalue={user.userName}
						onChange={onChange}
						error={errors} />
					<TextInput
						type="email"
						name="email"
						label="email"
						defaultvalue={user.email}
						onChange={onChange}
						error={errors} />
					<TextInput
						name="password"
						type="password"
						label="password"
						defaultvalue={user.password}
						onChange={onChange}
						error={errors} />
					<TextInput
						type="text"
						name="roleId"
						label="role"
						defaultvalue={user.roleId}
						onChange={onChange}
						error={errors} />
					<a disabled={loading}
						value={loading ? 'saving ...' : 'save'}
						className="btn teal darken-2"
						onClick={onSave} > SignUp </a>
				</form>
			</div>
		</div>
	);

export default UserForm;