import React, { useState, useCallback, ReactNode } from 'react';
import { AskFab } from './AskFab';
import { AskModal } from './AskModal';

interface AskOverlayProviderProps {
  children: ReactNode;
}

export function AskOverlayProvider({ children }: AskOverlayProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      {children}
      <AskFab onPress={handleOpenModal} />
      <AskModal visible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
}
