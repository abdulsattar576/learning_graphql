const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
} = require("graphql");
const AuthorType = require("../types/author/author.type");
const BookType = require("../types/book.type");
const BookModal = require("../model/auther/book");
const AuthorModel = require("../model/auther/Auther");
const BookPaginationType = require("../types/book.pagination");
const CategoryType = require("../types/category.type");
const CategoryModal = require("../model/category");
const RootMuatation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    AddAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        if (!args.name) {
          throw new Error("author name is required");
        }
        const author = await AuthorModel.create({ name: args.name });
        return author;
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString },
        parentCategory: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await CategoryModal.create({
          name: args.name,
          parentCategory: args.parentCategory || null,
        });
      },
    },
    AddBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        categoryId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        if (!args.id || !args.title) {
          throw new Error("Both field are  required");
        }
        const Book = await BookModal.create({
          title: args.title,
          authorId: args.id,
          categoryId: args.categoryId,
        });
        return Book;
      },
    },
  },
});
const RootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    GetAuthor: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return AuthorModel.find();
      },
    },
    GetBooks: {
      type: new GraphQLList(BookType),
      args: {
        page: { type: GraphQLInt },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const limit = 13;
        const page = args.page || 1;
        const offset = (page - 1) * limit;
        let filter = {};
        if (args.authorId) {
          filter.authorId = args.authorId;
        }
        return BookModal.find(filter).skip(offset).limit(limit);
      },
    },
    GetBooksByAuthor: {
      type: new GraphQLList(AuthorType),
      args: {
        authorId: { type: GraphQLID },
      },
      async resolve(_, args) {
        if (!args.authorId) {
          throw new Error("authorId is missing");
        }

        const data = await BookModal.find({ authorId: args.authorId }).populate(
          "authorId",
        );
        console.log(data);
        return data;
      },
    },
    GetBooksByPagination: {
      type: BookPaginationType,
      args: { page: { type: GraphQLInt }, authorId: { type: GraphQLID } },
      async resolve(parent, args) {
        const page = args.page || 1;
        const limit = 5;
        const offset = (args.page - 1) * limit;
        let filter = {};
        if (args.authorId) {
          filter.authorId = args.authorId;
        }
        const totalCount = await BookModal.countDocuments(args.authorId);

        const totalPages = Math.ceil(totalCount / limit);

        const books = await BookModal.find().skip(offset).limit(limit);
        return {
          books,
          totalPages,
          currentPage: page,
          hasNextPage: page < totalPages ? "true" : "false",
          hasPreviousPage: page > 1 ? "true" : "false",
        };
      },
    },
    GetBookByCategoryName: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await CategoryModal.findById(args.id);
      },
    },
  },
});
const schema = new GraphQLSchema({
  mutation: RootMuatation,
  query: RootQuery,
});

module.exports = schema;
