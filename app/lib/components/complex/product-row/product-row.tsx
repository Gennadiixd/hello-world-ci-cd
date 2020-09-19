import EditableText from "../editable-text";

export default function ProductRow({ product }) {
  const { id, title, description, image, price } = product;

  const onCommit = (newValue) => {
    console.log(newValue);
  };

  return (
    <div className="row--container">
      <div className="row">
        <div className="grid-4 row--image">
          <img src={image} />
        </div>
        <div className="grid-8 row--info">
          <EditableText
            className="row--title"
            content={title}
            onCommit={onCommit}
            name="title"
          />
          <EditableText
            className="row--description"
            content={description}
            onCommit={onCommit}
            name="description"
          />
          <EditableText
            className="row--price"
            content={price}
            onCommit={onCommit}
            name="price"
          />
        </div>
      </div>
    </div>
  );
}
