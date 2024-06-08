import React, { createContext, useContext, useState } from 'react';

interface AuthModalContextProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const AuthModalContext = createContext<AuthModalContextProps>({
  showModal: false,
  setShowModal: undefined,
});

export function AuthModalProvider({ children }: { children: JSX.Element }) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return <AuthModalContext.Provider value={{ showModal, setShowModal }}>{children}</AuthModalContext.Provider>;
}

export function useAuthModalContext() {
  return useContext(AuthModalContext);
}
