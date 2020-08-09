const dictionary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(
  " "
);

const categories = ["domestic", "garden", "clothing", "furniture", "music"];

const getRandomNumber = (max, min) => Math.floor(Math.random() * max) + min;

const getRandomNumbers = (n) => {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(getRandomNumber(dictionary.length, 1));
  }
  return numbers;
};

const generateProductField = (fieldType, max = 0, min = 0) => {
  if (fieldType === "string") {
    const numbers = getRandomNumbers(getRandomNumber(max, min));
    const fieldValue = [];
    for (let i = 0; i < numbers.length; i++) {
      fieldValue.push(dictionary[numbers[i]]);
    }
    return fieldValue.join(" ");
  } else if (fieldType === "category") {
    return categories[getRandomNumber(categories.length, 0)];
  } else {
    return getRandomNumber(max, min);
  }
};

export const generateProducts = (num = 100) => {
  const products = [];
  for (let i = 0; i < num; i++) {
    const product = {} as any;
    product.title = generateProductField("string", 7, 2);
    product.description = generateProductField("string", 30, 15);
    product.price = generateProductField("number", 300, 100);
    product.image =
      "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";
    product.rate = generateProductField("number", 5, 0);
    product.category = generateProductField("category");
    products.push(product);
  }
  return products;
};
