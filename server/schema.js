const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    products(filter: ProductOnSale): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  input ProductOnSale {
    onSale: Boolean
  }
  type Category {
    id: ID!
    name: String!
    products(filter: ProductOnSale): [Product!]!
  }
  type AddCategory {
    id: ID!
    name: String!
  }
  type Product {
    id: ID!
    name: String!
    image: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews(filter: ReviewsRating): [Reviews!]
  }
  type AddProduct {
    id: ID!
    name: String!
    image: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
	category: Category 
  }
  input ReviewsRating {
    rating: Int
  }
  type Reviews {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
  type Mutation {
    addCategory(input: AddCategoryInput): AddCategory!
	addProduct(input: AddProductInput): AddProduct!

  }
  input AddCategoryInput {
    name: String!
  }
  input AddProductInput {
	name:  String!
    description:  String!
    quantity: Int!
    price: Int!
    image:  String!
    onSale: Boolean!
    categoryId: ID!

  }
`;
