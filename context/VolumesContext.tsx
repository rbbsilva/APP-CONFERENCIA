import React, { createContext, useContext, useState, ReactNode } from 'react';

type Volume = {
  id: string;
  itens: string[];
  conferido: boolean;
};

type Pedido = {
  id: string;
  volumes: Volume[];
  finalizado: boolean;
};

type VolumesContextType = {
  pedidos: Pedido[];
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>;
};

const VolumesContext = createContext<VolumesContextType | undefined>(undefined);

export const VolumesProvider = ({ children }: { children: ReactNode }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: '1001',
      finalizado: false,
      volumes: [
        { id: '1', itens: ['Pizza', 'Coca'], conferido: false },
        { id: '2', itens: ['Hambúrguer', 'Suco'], conferido: false },
      ],
    },
    {
      id: '1002',
      finalizado: false,
      volumes: [
        { id: '1', itens: ['Pastel', 'Guaraná'], conferido: false },
        { id: '2', itens: ['Batata Frita'], conferido: false },
      ],
    },
  ]);

  return (
    <VolumesContext.Provider value={{ pedidos, setPedidos }}>
      {children}
    </VolumesContext.Provider>
  );
};

export const useVolumes = (): VolumesContextType => {
  const context = useContext(VolumesContext);
  if (!context) throw new Error('useVolumes must be used within a VolumesProvider');
  return context;
};
