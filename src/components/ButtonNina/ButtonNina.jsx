import "./ButtonNina.css";

const ButtonNina = ({ content, onClick }) => {
  return (
    <button
      className="button button--nina button--text-thick button--text-upper button--size-s"
      data-text={content}
      onClick={onClick}
    >
      {content && content.split("").map((char, index) => <span key={index}>{char}</span>)}
    </button>
  );
};

export default ButtonNina;
