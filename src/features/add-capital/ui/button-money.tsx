import React, { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useHapticFeedback } from '@tma.js/sdk-react';
import { processTapEvent, selectBoostById, selectEnergy } from '@entities/game/model';
import { useAppDispatch, useAppSelector } from '@app/model/root-store';
import dollarMaskSrc from '../assets/100-dollars.jpg';
import BgLightSvg from '../assets/bg-light.svg';
import { styled } from '@mui/material';
import { motion, useAnimate } from 'framer-motion';
import { EBoostType } from '@entities/game/types';
import { nanoid } from '@reduxjs/toolkit';
import { CAPITAL_ROOT_ID } from '@entities/game/ui';
import { createPortal } from 'react-dom';

interface ButtonMoneyProps {
  onClick?: MouseEventHandler<SVGElement>;
}

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
`;

const Bg = styled('div')`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
`;

const MainDollar = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const AnimatedDollars = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Dollar = styled(motion.div)`
  user-select: none;
  position: absolute;
  background-image: url(${dollarMaskSrc});
  min-height: 545px;
  width: 247px;
  background-repeat: no-repeat;
`;

const randomSign = () => (Math.random() >= 0.5 ? 1 : -1);

const createAnimate = () => {
  const scaleX = Math.random() * randomSign() * 0.1;
  const scaleY = Math.random() * randomSign() * 0.1;

  const translateX = `${Math.ceil(Math.random() * 60 * randomSign())}%`;

  const skewX = `${Math.ceil(Math.random() * 20 * randomSign())}deg`;
  const skewY = `${Math.ceil(Math.random() * 20 * randomSign())}deg`;

  return {
    transform: `translate(${translateX}, -110%) scale(${scaleX}, ${scaleY}) skew(${skewX}, ${skewY})`,
  };
};

interface DollarState {
  id: string;
  animate: { transform: string };
  isAlreadyAnimated: boolean;
}

const createDefaultDollars = () => [
  { id: nanoid(8), animate: createAnimate(), isAlreadyAnimated: false },
  { id: nanoid(8), animate: createAnimate(), isAlreadyAnimated: false },
];

export const ButtonMoney: FC<ButtonMoneyProps> = () => {
  const popupsContainer = useRef<Element | null>(null);
  const energy = useAppSelector(selectEnergy);
  const [dollarsScope, dollarsAnimation] = useAnimate();
  const multiTapBoost = useAppSelector((state) => selectBoostById(state, EBoostType.multiTap));
  const dispatch = useAppDispatch();
  const haptic = useHapticFeedback();
  const [dollars, setDollars] = useState<DollarState[]>(createDefaultDollars);
  const [popups, setPopups] = useState<PopupProps[]>([]);

  useEffect(() => {
    const container = document.querySelector(`#${CAPITAL_ROOT_ID}`);
    if (container) {
      popupsContainer.current = container;
    }
  }, []);

  const remove = useCallback((id: string) => {
    setDollars((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const removePopup = useCallback((id: string) => {
    setPopups((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <Wrapper role="button">
      <Bg>
        <BgLightSvg />
      </Bg>
      <MainDollar>
        <Dollar
          sx={{
            transform: ' translate(-10px, 10px)',
          }}
        />
        <Dollar
          sx={{
            transform: ' translate(-5px, 5px)',
          }}
        />
      </MainDollar>
      <AnimatedDollars ref={dollarsScope}>
        {dollars.map(({ id, animate, isAlreadyAnimated }) => {
          const onDragEnd = () => {
            if (energy >= multiTapBoost.level && !isAlreadyAnimated) {
              haptic.impactOccurred('medium');
              setDollars((prev) => {
                const currentDollarIndex = prev.findIndex((value) => value.id === id);
                prev[currentDollarIndex].isAlreadyAnimated = true;
                return [{ id: nanoid(), animate: createAnimate(), isAlreadyAnimated: false }, ...prev];
              });
              setPopups((prev) => [...prev, { id: nanoid(8) }]);
              dispatch(processTapEvent());

              const animationControl = dollarsAnimation(`[data-id="${id}"]`, animate);

              animationControl
                .then(async () => {
                  remove(id);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          };

          return (
            <Dollar
              drag={energy >= multiTapBoost.level}
              key={id}
              data-id={id}
              onDragEnd={onDragEnd}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          );
        })}
      </AnimatedDollars>
      {popups.map(({ id }) => {
        return (
          popupsContainer.current &&
          createPortal(
            <Popup
              key={id}
              style={{ top: `0`, left: `100%` }}
              initial={{ opacity: 1, transform: 'translateY(0px)' }}
              animate={{ opacity: 0, transform: 'translateY(-20px)' }}
              onAnimationComplete={() => removePopup(id)}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              +{multiTapBoost.level}$
            </Popup>,
            popupsContainer.current,
          )
        );
      })}
    </Wrapper>
  );
};

interface PopupProps {
  id: string;
}

const Popup = styled(motion.div)`
  position: absolute;
  color: #ffcd1b;
  font-weight: bold;
  user-select: none;
  z-index: 999;
  font-size: 32px;
`;
