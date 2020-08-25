export default function CartItem({
  item,
  onIncreaseItemsCounter,
  onDecreaseItemsCounter,
}) {
  const { image, price, title, description, count, id } = item;

  return (
    <div className="grid-12 cart__item--container">
      <div className="grid-4 cart__item--image-container">
        <img src={image} />
      </div>
      <div className="grid-6 cart__item--about">
        <div className="cart__item--title">{title}</div>
        <div className="cart__item--description">{description}</div>
        <div className="cart__item--price">{price} $</div>
      </div>
      <div className="grid-2 cart__item--actions">
        <button onClick={() => onIncreaseItemsCounter(id)}>+</button>
        {count}
        <button onClick={() => onDecreaseItemsCounter(id)}>-</button>
      </div>
    </div>
  );
}
