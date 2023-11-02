import PropTypes from 'prop-types';
import './input.less';
function Input({ type, placeholder, value, onChange }) {
	return <input type={type} placeholder={placeholder} value={value} onChange={onChange} />;
}

Input.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
export default Input;
