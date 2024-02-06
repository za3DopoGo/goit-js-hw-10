import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const delayInput = form.querySelector("input[name='delay']");
  const stateInputs = form.querySelectorAll("input[name='state']");
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const delay = parseInt(delayInput.value);
    const state = [...stateInputs].find(input => input.checked).value;
    
    try {
      await new Promise((resolve, reject) => {
        if (state === "fulfilled") {
          setTimeout(() => {
            resolve(delay);
          }, delay);
        } else if (state === "rejected") {
          setTimeout(() => {
            reject(delay);
          }, delay);
        }
      });

      iziToast.success({
        title: "Notification",
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    } catch (error) {
      iziToast.error({
        title: "Notification",
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
      }
      delayInput.value = '';
  });
});
