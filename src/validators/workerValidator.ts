import { body, param, ValidationChain } from 'express-validator';

export const validateId: ValidationChain = param('id')
  .escape()
  .trim()
  .isInt()
  .withMessage('Id must be an integer')
  .notEmpty()
  .withMessage('Id is required');

export const validateDepartmentName: ValidationChain = body('department_name')
  .optional()
  .escape()
  .trim()
  .isString()
  .withMessage('Department name must be a string')
  .isIn(['HR', 'IT', 'Finance', 'Sales', ''])
  .withMessage(
    'Department name must be one of: "HR, IT, Finance, Sales". If the worker doesn\'t have a department, don\'t send this parameter or leave it blank'
  );

export const createWorkerValidator: ValidationChain[] = [
  body('first_name')
    .escape()
    .trim()
    .isString()
    .withMessage('First name must be a string')
    .notEmpty()
    .withMessage('First name is required'),

  body('last_name')
    .escape()
    .trim()
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty()
    .withMessage('Last name is required'),

  body('position')
    .escape()
    .trim()
    .isString()
    .withMessage('Position must be a string')
    .notEmpty()
    .withMessage('Position is required'),

  body('phone').escape().trim().isString().notEmpty().withMessage('Phone is required'),

  validateDepartmentName
];

export const updateWorkerValidator: ValidationChain[] = [
  validateId,

  body('first_name').optional().escape().trim().isString().withMessage('First name must be a string'),

  body('last_name').optional().escape().trim().isString().withMessage('Last name must be a string'),

  body('position').optional().escape().trim().isString().withMessage('Position must be a string'),

  body('phone').optional().escape().trim().isString().withMessage('Phone must be a string'),

  validateDepartmentName
];
