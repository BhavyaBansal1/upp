import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const token = localStorage.getItem('token');

  if (token) {
    console.log(' Token found:', token);

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(' Request cloned with Authorization header');

    return next(clonedReq);
  }

  console.log(' No token found');

  return next(req);
};