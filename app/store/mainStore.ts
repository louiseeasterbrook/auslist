import {createContext, useContext} from 'react';
import {types, Instance} from 'mobx-state-tree';

//STORE

export const MainStore = types
  .model('MainStore')
  .props({
    mainColor: types.optional(types.string, 'green'),
    appVersion: types.optional(types.string, '0.0.0'),
  })
  .views(self => ({
    get appVersionString() {
      return self.appVersion;
    },
  }))
  .actions(self => ({
    setMainColor: (color: string) => {
      self.mainColor = color;
    },
    setAppVersion: (appVersion: string) => {
      self.appVersion = appVersion;
    },
  }));

//ROOT STORE
// for multiple stores
// export const RootStoreModel = types.model('RootStore').props({
//   main: types.optional(MainStore, {}),
// });

export type RootStore = Instance<typeof MainStore>;

//ROOT STORE CONTEXT
const RootStoreContext = createContext<RootStore>({} as RootStore);

export const RootStoreProvider = RootStoreContext.Provider;

export const useStores = () => useContext(RootStoreContext);
