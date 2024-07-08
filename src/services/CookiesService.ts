import Cookies from 'universal-cookie';

class CookiesService {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  get(key: string) {
    return this.cookies.get(key);
  }

  set(key: string, value: string, options = {}) {
    this.cookies.set(key, value, { ...options });
  }

  remove(key: string, options = {}) {
    this.cookies.remove(key, options);
  }

  addChangeListener(callback: () => void) {
    this.cookies.addChangeListener(callback);
  }

  removeChangeListener(callback: () => void) {
    this.cookies.removeChangeListener(callback);
  }
}

export default new CookiesService();
