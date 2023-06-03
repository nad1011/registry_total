import "./ButtonNina.css";

export default function ButtonNina({ content }) {
  return (
    <button
      className="button button--nina button--text-thick button--text-upper button--size-s"
      data-text={content}
      onClick={() => {
        //
        //
        // task here
        //
        //
      }}
    >
      {content &&
        content.split("").map((char, index) => <span key={index}>{char}</span>)}
      {/* <span>U</span>
      <span>p</span>
      <span>&nbsp;</span>
      <span>l</span>
      <span>o</span>
      <span>a</span>
      <span>d</span> */}
    </button>
  );
};
export default ButtonNina;
