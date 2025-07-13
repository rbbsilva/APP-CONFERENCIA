import React, { createContext, useState, useContext, ReactNode } from 'react';

type Volume = {
  id: string;
  itens: string[];
  conferido: boolean;
};

type VolumesContextType = {
  volumes: Volume[];
  setVolumes: React.Dispatch<React.SetStateAction<Volume[]>>;
};

const VolumesContext = createContext<VolumesContextType | undefined>(undefined);

export const VolumesProvider = ({ children }: { children: ReactNode }) => {
  const [volumes, setVolumes] = useState<Volume[]>([
    { id: '1', itens: ['Pizza', 'Coca-Cola'], conferido: false },
    { id: '2', itens: ['Hambúrguer', 'Suco'], conferido: false },
    { id: '3', itens: ['Salgados', 'Água'], conferido: false },
  ]);

  return (
    <VolumesContext.Provider value={{ volumes, setVolumes }}>
      {children}
    </VolumesContext.Provider>
  );
};

export const useVolumes = (): VolumesContextType => {
  const context = useContext(VolumesContext);
  if (!context) {
    throw new Error('useVolumes must be used within a VolumesProvider');
  }
  return context;
};
