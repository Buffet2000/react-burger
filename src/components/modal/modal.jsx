import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay"

export default function Modal({ title, children, active, handleClose }) {

  React.useEffect(() => {
    const closeByEsc = (e) => (e.key === "Escape" ? handleClose() : null);
    document.addEventListener("keydown", closeByEsc);
    
    return () => document.removeEventListener("keydown", closeByEsc);
  });

  if (!active) return null;

  return ReactDOM.createPortal(
    <>
      <div className={active ? `${styles.modal} ${styles.modal_active}` : styles.modal}>
        <p className="text text_type_main-large mt-3 mb-3">{title}</p>
        <button className={styles.button_close} onClick={() => handleClose()}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay handleClose={handleClose} />
    </>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired, 
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  active: PropTypes.bool,
}