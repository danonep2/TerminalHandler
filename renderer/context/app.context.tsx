import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { ScopeInterface } from '../@types/scope';
import { CommandInterface } from '../@types/command';
import * as _ from 'lodash';

type AppContextType = {
  scopeSelected: ScopeInterface | undefined;
  setScopeSelected: (scope: ScopeInterface) => void;
  scopeList: ScopeInterface[];
  updateIsRunning: (
    id_scope: number, id_command: number, isRunning: boolean
  ) => void
  addEscope: (scope: ScopeInterface) => void
  addCommand: (command: CommandInterface) => void
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [scopeSelected, setScopeSelected] = useState<ScopeInterface>();
  const [scopeList, setScopeList] = useState<ScopeInterface[]>();
  const [updateOutData, setUpdateOutData] = useState({} as any);
  const [updateIsRunningObj, setUpdateIsRunningObj] = useState({} as any);

  useEffect(() => {
    const { result, id_command, id_scope } = updateOutData;

    const scope = scopeList?.find((scope) => scope.id === id_scope);
    const command = scope?.commands.find((command) => command.id_command === id_command);

    if (!command) {
      return;
    }

    command.output = command.output + result;
    setScopeList([...scopeList]);
  },[updateOutData]);

  useEffect(() => {
    const { id_command, id_scope } = updateIsRunningObj;
    updateIsRunning(id_scope, id_command, false);
  }, [updateIsRunningObj]);

  useEffect(() => {
    // @ts-ignore
    window.api.onSaida((event) => {
      const data = JSON.parse(event);

      setUpdateOutData(data);
    });

    // @ts-ignore
    window.api.onFim((msg) => {
      setUpdateIsRunningObj(JSON.parse(msg));
    });

    // @ts-ignore
    window.api.resetAllHandles();

    const getData = async () => {
      if(scopeList !== undefined) {
        return
      }

      // @ts-ignore
      const data = await window.api.getData();
      setScopeList(JSON.parse(data) || []);
    }

    getData();
  }, []);

  useEffect(() => {
    if(scopeList === undefined) {
      return;
    }

    const scopeListClone = _.cloneDeep(scopeList);

    scopeListClone.forEach((scope) => {
      scope.commands.forEach((command) => {
        command.isRunning = false;
        command.output = '';
      })
    })

    // @ts-ignore
    window.api.saveData(JSON.stringify(scopeListClone));
  }, [scopeList]);

  const updateIsRunning = (id_scope: number, id_command: number, isRunning: boolean) => {
    const scope = scopeList?.find((scope) => scope.id === id_scope);
    const command = scope?.commands.find((command) => command.id_command === id_command)

    if (!command) {
      return;
    }

    command.isRunning = isRunning;
    setScopeList([...scopeList]);
  }

  const addEscope = (scope: ScopeInterface) => {
    setScopeList([...scopeList || [], scope]);
  }

  const addCommand = ( command: CommandInterface) => {
    scopeSelected.commands.push(command);
    setScopeList([...scopeList]);
  }

  const contextValue = {
    scopeSelected,
    setScopeSelected,
    scopeList,
    updateIsRunning,
    addEscope,
    addCommand
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
