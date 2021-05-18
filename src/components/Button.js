import PropTypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: "green",
  text: "Add",
};

export default Button;
