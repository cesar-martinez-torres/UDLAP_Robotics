import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ISidebarContext {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<ISidebarContext | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    // Load from localStorage, default to true
    const stored = localStorage.getItem('sidebar-visible');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    // Save to localStorage whenever it changes
    localStorage.setItem('sidebar-visible', String(isOpen));
  }, [isOpen]);

  const toggle = () => setIsOpen(prev => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): ISidebarContext => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};
