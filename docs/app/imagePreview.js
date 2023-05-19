const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");

imageInput.addEventListener("change", handleImagePreviewChange);

/** @param {Event & { currentTarget: HTMLInputElement }} e */
function handleImagePreviewChange(e) {
  const [file] = e.currentTarget.files;
  if (!file) {
    imagePreview.src = "";
    return;
  }

  imagePreview.src = URL.createObjectURL(file);
}
