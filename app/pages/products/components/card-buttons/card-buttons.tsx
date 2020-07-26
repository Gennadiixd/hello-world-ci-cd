export default function CardButtons({ onClickLookCloser }) {
  return (
    <div className="product__card--buttons">
      <button>Add to cart</button>
      <button onClick={onClickLookCloser}>Look closer</button>
    </div>
  );
}
