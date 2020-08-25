export default function CardButtons({ onLookCloser, onAddToCart }) {
  return (
    <div className="card--actions">
      <button onClick={onAddToCart}>Add to cart</button>
      <button onClick={onLookCloser}>Look closer</button>
    </div>
  );
}
