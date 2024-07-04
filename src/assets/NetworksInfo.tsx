import cur_eth from '../assets/currenciesIcons/cur_eth.png';
import cur_ron from '../assets/currenciesIcons/cur_ron.png';

const roninInfo = { network: 'Ronin', icon: cur_ron };
const ethereumInfo = { network: 'Ethereum', icon: cur_eth };

const NetworksInfo: { [symbol: string]: { network: string; icon: string } } = {
  Ronin: roninInfo,
  Ethereum: ethereumInfo,
};

export default NetworksInfo;
