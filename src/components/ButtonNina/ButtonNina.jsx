import "./ButtonNina.css";

const ButtonNina = ({ onClick }) => {
  return (
    <button
      className="button button--nina button--text-thick button--text-upper button--size-s"
      data-text="Upload"
      onClick={onClick}
    >
      <span>U</span>
      <span>p</span>
      <span>l</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
    </button>
  );
};
export default ButtonNina;
