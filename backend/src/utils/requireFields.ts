import { Request, Response, NextFunction } from 'express';

export function validateRequest(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter((field) => !(field in req.body));
    if (missingFields.length > 0) {
      res.status(400).json({ missingFields: `${missingFields.join(', ')}` });
    } else {
      next();
    }
  };
}