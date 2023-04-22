export default function Statistic({ title, number }) {
  return (
    <div
      style={{
        fontSize: 24,
        color: "white",
      }}
    >
      {title}: {number}
    </div>
  );
}
