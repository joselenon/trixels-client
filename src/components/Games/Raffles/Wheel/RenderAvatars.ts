import seedrandom from 'seedrandom';

import { IRaffleToFrontEnd, TWinnerBetInRedis } from '../../../../interfaces/IRaffles';

interface IPlayers {
  username: string;
  avatar: string;
  amountOfTickets: number;
}

function seedShuffler(array: string[]) {
  const newArray = [...array];
  const random = seedrandom(`avatars`);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

class RenderAvatars {
  private totalAvatars = 110;
  private order: string[] = [];

  constructor(
    private bets: IRaffleToFrontEnd['info']['bets'],
    private totalTickets: IRaffleToFrontEnd['info']['totalTickets'],
  ) {}

  getUniquePlayers() {
    const uniquePlayers: IPlayers[] = [];

    this.bets.forEach((bet) => {
      const betterUsername = bet.userRef.username;
      const betterAvatar = bet.userRef.avatar;
      const amountOfTickets = bet.info.tickets.length;

      const userFound = uniquePlayers.find((user) => user.username === betterUsername);

      if (userFound) {
        userFound.amountOfTickets += bet.info.tickets.length;
      } else {
        uniquePlayers.push({
          username: betterUsername,
          avatar: betterAvatar,
          amountOfTickets,
        });
      }
    });
    return uniquePlayers;
  }

  normalRender() {
    const order: string[] = [];
    const uniquePlayers = this.getUniquePlayers();

    uniquePlayers.forEach((player) => {
      const totalTicketsBought = this.bets.reduce((acc, bet) => bet.info.tickets.length + acc, 0);
      const chanceOfWinning = player.amountOfTickets / totalTicketsBought;

      const amountOfAvatars = Math.round(this.totalAvatars * chanceOfWinning);

      for (let count = 0; count < amountOfAvatars; count++) {
        order.push(player.avatar);
      }
    });

    const shuffledOrder = seedShuffler(order);
    this.order = shuffledOrder;

    return this.order;
  }

  renderWinner(winnerBet: TWinnerBetInRedis) {
    try {
      this.normalRender();
      if (!winnerBet) throw new Error('Algo deu errado.');
      const { avatar } = winnerBet.betRef.userRef;

      this.order.splice(91, 1, avatar);
      return this.order;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default RenderAvatars;
