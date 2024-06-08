/* Multiplicar preropllscreentime pela quantidade de vencedores que tiver */
const WheelAnimationTime = 4000;
const TimerTime = 10000;
const DelayTillAnimate = 500;
const DelayTillPointerDisappear = 1000;

const TotalTimeTillAnimationFinish = WheelAnimationTime + TimerTime + DelayTillAnimate + DelayTillPointerDisappear;

const raffleAnimationAlreadyEndedFn = (finishedAt: number | undefined) => {
  if (finishedAt) {
    const nowTime = new Date().getTime();
    const diff = finishedAt + TotalTimeTillAnimationFinish - nowTime;

    return { alreadyEnded: diff <= 0, timeLeft: diff };
  }

  return { alreadyEnded: false, timeLeft: undefined };
};

export { DelayTillAnimate, raffleAnimationAlreadyEndedFn, TimerTime, TotalTimeTillAnimationFinish, WheelAnimationTime };
