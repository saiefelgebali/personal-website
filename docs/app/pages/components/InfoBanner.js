export class InfoBanner {
  /** @param {HTMLDivElement} container */
  constructor(container) {
    this.container = container;
    this.closeButton = this.container.querySelector(".close-button");
    this.closeButton.addEventListener("click", this.closeBanner);
  }

  setText = (text) => {
    this.container.querySelector(".text").textContent = text;
    this.openBanner();
  };

  /** @param {Error} error */
  setError = (error) => {
    this.container.classList.add("error");
    this.setText(`Error: ${error.message}`);
  };

  openBanner = () => {
    this.container.classList.add("show");
  };

  closeBanner = (e) => {
    e.preventDefault();
    this.container.classList.remove("show");
  };
}
