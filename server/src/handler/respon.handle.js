const responsenWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const err = (res) =>
  responsenWithData(res, 500, {
    status: 500,
    message: "Opps! SomethingWorng",
  });
const badrequest = (res, message) =>
  responsenWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responsenWithData(res, 200, data);

const created = (res, data) => responsenWithData(res, 201, data);
const unauther = (res) =>
  responsenWithData(res, 401, {
    status: 401,
    message: "unAuthorized",
  });
const notFund = (res) =>
  responsenWithData(res, 404, {
    status: 404,
    message: "Resource Not Found",
  });

export default { err, badrequest, ok, created, unauther, notFund };
