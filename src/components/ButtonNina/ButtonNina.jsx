import "./ButtonNina.css";

export default function ButtonNina() {
  return (
    <button
      className="button button--nina button--text-thick button--text-upper button--size-s"
      data-text="Upload"
      onClick={() => {
        console.log("Upload");
      }}
    >
      <span>U</span>
      <span>p</span>
      <span>l</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
    </button>
  );
}
