const errorHandler = (err, req, res, next) => {
  // for validation error arrays
  if (err.status && Array.isArray(err.message)) {
    let messageArr = [];
    err.message.forEach((item) => {
      messageArr.push(item.msg);
    });
    const messageList = messageArr.join(" | ");
    res.status(err.status).json({ msg: messageList });

    // for explicit checks
  } else if (err.status) {
    res.status(err.status).json({ msg: err.message });

    // for all other errors
  } else {
    res.status(500).json({ msg: err.message });
  }
};

export default errorHandler;
