import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  conditionalModal, // optional: boolean that determines if the modal should be opened or not based on callback function passed into onButtonClick
  className // option: class name for the button

}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = (e) => {
    e.stopPropagation()
    if (typeof onButtonClick === "function") {
      if (!onButtonClick() && conditionalModal) return
    }
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <div onClick={e => onClick(e)} className={className}>{buttonText}</div>;
}

export default OpenModalButton;
