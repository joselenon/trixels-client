import cur_pixel from '../assets/currenciesIcons/cur_pixel.png';
import cur_ron from '../assets/currenciesIcons/cur_ron.png';

const pixelInfo = { symbol: 'PIXEL', icon: cur_pixel };
const ronInfo = { symbol: 'RON', icon: cur_ron };

const CurrenciesInfo: { [symbol: string]: { symbol: string; icon: string } } = {
  PIXEL: pixelInfo,
  RON: ronInfo,
};

export default CurrenciesInfo;
