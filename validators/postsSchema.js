import { checkSchema } from "express-validator";

export const post = checkSchema({
  id: {
    trim: true,
    notEmpty: {
      errorMessage: "The id value cannot be empty",
      bail: true,
    },
    isInt: {
      errorMessage: "The id needs to be an integer",
      bail: true,
    },
    toInt: true,
  },
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "The title cannot be empty",
      bail: true,
    },
    isLength: {
      options: { min: 4, max: 30 },
      errorMessage: "The title needs to be a min of 4 and max of 30 characters",
      bail: true,
    },
    escape: true,
  },
  comment: {
    trim: true,
    // notEmpty: {
    //   errorMessage: "The comment value cannot be empty",
    //   bail: true,
    // },
    optional: {
      options: { values: "null" },
    },
    isInt: {
      errorMessage: "The comment needs to be an integer",
      bail: true,
    },
    toInt: true,
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "The email cannot be empty",
      bail: true,
    },
    isEmail: true,
    normalizeEmail: true,
    isLength: {
      options: { min: 7, max: 30 },
      errorMessage: "Email needs to be a min 7 and max 30 characters",
      bail: true,
    },
  },
  date: {
    trim: true,
    notEmpty: {
      errorMessage: "The date cannot be empty",
      bail: true,
    },
    isDate: {
      options: { format: "MM/DD/YYYY", strictMode: true },
      errorMessage: "Date needs to be a string in MM/DD/YYYY form at",
      bail: true,
    },
  },
});
