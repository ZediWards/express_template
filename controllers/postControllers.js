import { validationResult } from "express-validator";

let posts = [
  {
    id: 1,
    title: "Post One",
    comments: 2,
    email: "Yooo@gmail.com",
    date: "01/02/2024",
  },
  {
    id: 2,
    title: "Post Two",
    comments: 1,
    email: "JoJo123@yahoo.com",
    date: "06/10/2024",
  },
  {
    id: 3,
    title: "Post Three",
    comments: 4,
    email: "email@yahoo.com",
    date: "02/15/2024",
  },
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
};

// @desc Get single post
// @route GET /api/posts/:id
export const getPost = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: result.array(),
    });
  }

  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error); // error handling middleware
  }
  // const err = post.push(errrr);  // this gets caught by catch but do we really want internal errors being displayed to the client?
  // throw new Error("error after if statement");  // gets caught by catch
  res.status(200).json(post);
};

// @desc Create new post
// @route POST /api/posts
export const createPost = (req, res, next) => {
  const newPost = {
    // id: posts.length + 1,
    id: req.body.id,
    title: req.body.title,
    comment: req.body.comment,
    email: req.body.email,
    date: req.body.date,
  };
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new Error();
    error.status = 400;
    error.message = result.array();
    return next(error);
  }
  try {
    // error check **only needed if validation isn't checking for same thing
    if (!newPost.title) {
      const error = new Error(`Please include a title`);
      error.status = 400;
      return next(error);
    }
    // do something with the request
    posts.push(newPost);
    // response to client
    res.status(201).json(posts);
  } catch (error) {
    return next(error.message);
  }
};

// @desc Update post
// @route PUT /api/posts/:id
export const updatePost = (res, req, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  post.title = req.body.title;

  res.status(200).json(posts);
};

// @desc Delete post
// @route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 400;
    return next(error);
  }

  posts = posts.filter((post) => post, id !== id);

  res.status(200).json(posts);
};
