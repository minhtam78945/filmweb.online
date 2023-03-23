import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json(erros.array()[0].msg);
};
export default { validate };
