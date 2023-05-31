export class ImageInput {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.container = container;

    /** @type {HTMLInputElement} */
    this.input = this.container.querySelector("input");

    /** @type {HTMLImageElement} */
    this.preview = this.container.querySelector("img");

    this.input.addEventListener("change", this.handleImagePreviewChange);
  }

  handleImagePreviewChange = (e) => {
    const [file] = e.currentTarget.files;

    if (!file) {
      this.clearImagePreview();
      return;
    }

    this.preview.src = URL.createObjectURL(file);
    this.container.classList.add("image-selected");
  };

  clearImagePreview = () => {
    this.container.classList.remove("image-selected");
    this.preview.src = "";
  };
}
