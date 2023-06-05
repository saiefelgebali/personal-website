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

    this.container.addEventListener("dragover", (e) => {
      // Prevent default behavior (Prevent file from being opened)
      e.preventDefault();
    });

    this.container.addEventListener("dragenter", () => {
      this.container.classList.add("drag-over");
    });

    this.container.addEventListener("dragleave", () => {
      this.container.classList.remove("drag-over");
    });

    this.container.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer.files.length < 1) {
        return;
      }

      this.showImagePreview(e.dataTransfer.files);
    });

    this.input.addEventListener("change", this.handleImagePreviewChange);
  }

  handleImagePreviewChange = (e) => {
    const fileList = e.currentTarget.files;

    if (fileList.length < 1) {
      this.clearImagePreview();
      return;
    }

    this.showImagePreview(fileList);
  };

  /** @param {FileList} fileList */
  showImagePreview = (fileList) => {
    if (fileList.length < 1) {
      console.error("Tried to preview an empty FileList.");
      return;
    }

    const file = fileList.item(0);

    if (!file.type.startsWith("image/")) {
      console.error("Tried to preview a file that isn't an image.");
      return;
    }

    this.preview.src = URL.createObjectURL(file);
    this.container.classList.add("image-selected");
    this.input.files = fileList;
  };

  clearImagePreview = () => {
    this.container.classList.remove("image-selected");
    this.preview.src = "";
  };
}
