import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);
  const messageRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };

    setToasts([...toasts, newToast]);
    setMessage("");
    messageRef.current.focus();
  }

  function handleDismiss(id) {
    const index = toasts.findIndex((toast) => toast.id === id);
    const nextToasts = [...toasts];
    nextToasts.splice(index, 1);
    setToasts(nextToasts);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />

      <form onSubmit={handleSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                required
                ref={messageRef}
                id="message"
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((opt) => (
                <label id={`variant-${opt}`} key={opt}>
                  <input
                    id={`variant-${opt}`}
                    type="radio"
                    name="variant"
                    value={opt}
                    checked={variant === opt}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
