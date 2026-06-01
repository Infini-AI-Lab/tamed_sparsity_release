const copyButton = document.querySelector(".copy-button");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const targetId = copyButton.dataset.copyTarget;
    const target = document.getElementById(targetId);
    if (!target) return;

    const text = target.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1400);
    } catch {
      copyButton.textContent = "Select text";
    }
  });
}
