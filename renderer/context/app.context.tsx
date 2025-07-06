import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { ScopeInterface } from '../@types/scope';
import scopeListMock from '../mocks/full-scope';

type AppContextType = {
  scopeSelected: ScopeInterface | undefined;
  setScopeSelected: (scope: ScopeInterface) => void;
  scopeList: ScopeInterface[];
  updateIsRunning: (
    id_scope: number, id_command: number, isRunning: boolean
  ) => void
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [scopeSelected, setScopeSelected] = useState<ScopeInterface>();
  const [scopeList, setScopeList] = useState<ScopeInterface[]>(scopeListMock);

  useEffect(() => {
    // @ts-ignore
    window.api.onSaida((event) => {
      const data = JSON.parse(event);
      const { result, id_command, id_scope } = data;

      const scope = scopeList.find((scope) => scope.id === id_scope);
      const command = scope?.commands.find((command) => command.id_command === id_command);

      if (command) {
        command.output = command.output + result;
      }

      setScopeList([...scopeList]);
    });

    // @ts-ignore
    window.api.onFim((msg) => {

    });

    // @ts-ignore
    window.api.resetAllHandles();
  }, []);

  const updateIsRunning = (id_scope: number, id_command: number, isRunning: boolean) => {
    const scope = scopeList.find((scope) => scope.id === id_scope);
    const command = scope?.commands.find((command) => command.id_command === id_command);
    if (command) {
      command.isRunning = isRunning;
    }

    setScopeList([...scopeList]);
  }


  const contextValue = {
    scopeSelected,
    setScopeSelected,
    scopeList,
    updateIsRunning
  }


  return (
    <AppContext.Provider value={{...contextValue}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve estar dentro do AppProvider');
  }
  return context;
};
