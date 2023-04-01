const { db } = require('./db');
const { v4: uuid } = require('uuid');

exports.resolvers = {
  Query: {
    products: (parent, args, { products }) => {
      if (args.filter && args.filter.onSale)
        return products.filter((item) => item.onSale === true);
      return products;
    },
    product: (parent, { id }, { products }) => {
      return products.find((item) => item.id === id);
    },
    categories: (_, __, { categories }) => {
      return categories;
    },
    category: (_, arg, context) => {
      return db.categories.find((item) => item.id === arg.id);
    },
    businesses: (_, arg, context) => {
      console.log('!');
      if (arg.filter.businescategories === 'All') return db.businesses;

      return [
        db.businesses.find(
          (item) => item.category === arg.filter.businescategories,
        ),
      ];
    },
  },
  Category: {
    products: (parent, args, context) => {
      const products = db.products.filter(
        (item) => item.categoryId === parent.id,
      );
      if (args.filter && args.filter.onSale) {
        return products.filter((item) => item.onSale === true);
      }
      return products;
    },
  },
  Product: {
    category: (parent, args, context) => {
      return db.categories.find((item) => item.id === parent.categoryId);
    },
    reviews: (parent, args, context) => {
      const products = db.reviews.filter(
        (item) => item.productId === parent.id,
      );
      if (args.filter && args.filter.rating)
        return products.filter((item) => item.rating >= args.filter.rating);
      return products;
    },
  },
  Mutation: {
    addCategory: (parent, args, context) => {
      const newCategory = {
        id: uuid(),
        name: args.input.name,
      };
      db.categories.push(newCategory);
      return newCategory;
    },
    addProduct: (parent, args, context) => {
      const newCategory = {
        id: uuid(),
        ...args.input,
      };

      console.log(newCategory);
      return newCategory;
    },
  },
};
