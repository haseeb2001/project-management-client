import Cookies from 'js-cookie';

export function getCookie(name) {
  const cookieValue = Cookies.get(name);
  return cookieValue ? cookieValue : null;
}
