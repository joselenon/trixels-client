import cur_eth from '../assets/currenciesIcons/cur_eth.png';
import cur_ron from '../assets/currenciesIcons/cur_ron.png';

const roninInfo = { label: 'Ronin', icon: <img alt="Ronin-network" src={cur_ron} width={20} height={20} /> };
const ethereumInfo = { label: 'Ethereum', icon: <img alt="Ethereum-network" src={cur_eth} width={20} height={20} /> };

const NetworksInfo: { [symbol: string]: { label: string; icon: JSX.Element } } = {
  Ronin: roninInfo,
  Ethereum: ethereumInfo,
};

export default NetworksInfo;
