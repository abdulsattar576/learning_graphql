const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
} = require("graphql");
const UserTypes = require("../types/user/type");
const UserModel = require("../model/user/user.model");
const { default: mongoose } = require("mongoose");
const UserInputTypes = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
  },
});
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: {
      type: UserTypes,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        if (!args.id) {
          throw new Error("Id is missing");
        }

        const user = await UserModel.findById(args.id);
        return user;
      },
    },
  },
});
const RootMuatation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: UserTypes,
      args: { input: { type: UserInputTypes } },
      resolve: async (_, { input }) => {
        if (!input.name || !input.age) {
          throw new Error("both fields are required");
        }
        const user = await UserModel.create({
          name: input.name,
          age: input.age,
        });
        return user;
      },
    },
    UpdateUser: {
      type: UserTypes,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        console.log(args);
        const updatedFields = {};

        if (!args.id) {
          throw new Error("id is missing");
        }
        if (!mongoose.Types.ObjectId.isValid(args.id)) {
          throw new Error("Invalid user ID");
        }
        if (args.name !== undefined) {
          updatedFields.name = args.name;
        }
        if (args.age !== undefined) {
          updatedFields.age = args.age;
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
          args.id,
          { $set: updatedFields },
          { new: true },
        );
        return updatedUser;
      },
    },
    DeleteUser: {
      type: UserTypes,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        if (!args.id) {
          throw new Error("id is missing");
        }
        const deletedUser = await UserModel.findByIdAndDelete(args.id);
        return deletedUser;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMuatation,
});
