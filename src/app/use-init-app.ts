import { useEffect, useRef } from 'react';
import { useClosingBehavior, useLaunchParams, useMiniApp, useViewport } from '@tma.js/sdk-react';

import { useLazyFetchAccountDataQuery } from '@entities/account/api';
import { useLazyFetchDictionariesQuery } from '@src/entities/dictionary/api';
import { sleep, useBoolean } from '@shared/libs';
import { useAuthMutation } from '@entities/base-api';
import { initSyncGame, processAutoClickEvent, processRegenEvent } from '@src/entities/game/model';
import { useAppDispatch } from '@app/model';
import { useLazyFetchGameDataQuery } from '@src/entities/game/api';

export const useInitApp = () => {
  const isStartedInitialize = useRef(false);

  const miniApp = useMiniApp();
  const viewport = useViewport();
  const closingBehavior = useClosingBehavior();

  const [isInitializedApp, setIsInitializedApp] = useBoolean(false);
  const { initDataRaw } = useLaunchParams();

  const [auth] = useAuthMutation();
  const [fetchAccountData] = useLazyFetchAccountDataQuery();
  const [fetchGameData] = useLazyFetchGameDataQuery();
  const [fetchDictionaries] = useLazyFetchDictionariesQuery();

  const dispatch = useAppDispatch();

  const init = async () => {
    closingBehavior.enableConfirmation();

    miniApp.setHeaderColor('#101010');
    miniApp.ready();
    viewport?.expand();

    if (initDataRaw) {
      await auth(initDataRaw);
      await fetchAccountData();
      await fetchGameData();

      setInterval(() => {
        dispatch(processRegenEvent());
        dispatch(processAutoClickEvent());
      }, 1000);

      dispatch(initSyncGame());
      await fetchDictionaries();
      await sleep(800);
    }

    setIsInitializedApp.on();
  };

  useEffect(() => {
    if (isStartedInitialize.current) {
      return;
    }

    isStartedInitialize.current = true;

    init();
  }, []);

  useEffect(() => {
    if (viewport && !viewport.isExpanded) {
      viewport.expand();
    }
  }, [viewport]);

  return isInitializedApp;
};
