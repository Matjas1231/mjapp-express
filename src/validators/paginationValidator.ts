import { ValidationChain, query } from 'express-validator';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const generatePaginationValidator = (field: string): ValidationChain => {
  const validationChain: ValidationChain = query(field)
    .escape()
    .trim()
    .notEmpty()
    .withMessage(`${capitalize(field)} is required`);

  if (field === 'page') {
    validationChain.isInt({ min: 1 }).withMessage(`${capitalize(field)} must be a postivie integer`);
  } else if (field === 'limit') {
    validationChain
      .isInt({ min: 1 })
      .withMessage(`${capitalize(field)} must be a postivie integer`)
      .custom((value) => [50, 100, 150].includes(parseInt(value, 10)));
  }

  return validationChain;
};

export const validatePageNumber: ValidationChain = generatePaginationValidator('page');
export const validateLimit: ValidationChain = generatePaginationValidator('limit');
