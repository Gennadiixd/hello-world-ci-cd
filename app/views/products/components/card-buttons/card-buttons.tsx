export default function CardButtons({ onClickLookCloser }) {
  return (
    <div className="card--actions">
      <button>Add to cart</button>
      <button onClick={onClickLookCloser}>Look closer</button>
    </div>
  );
}
