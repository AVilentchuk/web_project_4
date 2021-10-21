function getButtonText(buttonText, tail) {
  return /\w*e\b/.test(buttonText)
    ? /\w*e\b/.exec(buttonText).toString().replace(/\w\b/, tail)
    : button.textContent.toString() + tail;
}

export const loader = ({
  dots,
  completeTimeDelay,
  buttonSelector = ".popup_active .button_type_submit",
  clickHandler,
  callbackEnd = () => {},
  onError = () => {},
}) => {
  const { interval, count } = dots;
  const button = document.querySelector(buttonSelector);
  const buttonText = button.textContent.toString();
  const buttonStateProcessing = getButtonText(buttonText, "ing");
  const buttonStateComplete = getButtonText(buttonText, "ed");

  const loop = () => {
    button.textContent =
      button.textContent.length > buttonStateProcessing.length + count
        ? `${buttonStateProcessing}`
        : button.textContent + ".";
  };
  let intervalController = setInterval(loop, interval);

  clickHandler()
    .then((res) => {
      button.setAttribute("disabled", true);
      clearInterval(intervalController);
      button.textContent = `${buttonStateComplete} successfully`;
    })
    .catch((res) => {
      button.textContent = `Failed`;
      setTimeout("", completeTimeDelay * 2);
      clearInterval(intervalController);
    })
    .finally(() => {
      setTimeout(() => {
        callbackEnd();
      }, completeTimeDelay);

      setTimeout(() => {
        button.textContent = `${buttonText}`;
        button.removeAttribute("disabled");
      }, completeTimeDelay * 2);
    });
};
