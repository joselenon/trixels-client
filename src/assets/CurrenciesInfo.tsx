import cur_pixel from '../assets/currenciesIcons/cur_pixel.png';
import cur_ron from '../assets/currenciesIcons/cur_ron.png';

const pixelInfo = {
  label: 'PIXEL',
  icon: <img alt="cur-pixel" src={cur_pixel} width={20} height={20} style={{ imageRendering: 'pixelated' }} />,
};
const ronInfo = { label: 'RON', icon: <img alt="cur-pixel" src={cur_ron} width={20} height={20} /> };

export interface ICurrenciesInfoObjProps {
  [symbol: string]: { label: string; icon: JSX.Element };
}

const CurrenciesInfo: ICurrenciesInfoObjProps = {
  PIXEL: pixelInfo,
  RON: ronInfo,
};

export default CurrenciesInfo;
