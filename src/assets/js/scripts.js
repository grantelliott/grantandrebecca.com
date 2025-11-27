const copyBtn = document.getElementById("copyButton");
const copyTarget = document.getElementById("copyTarget");
const tooltip = document.getElementById("tooltip");

copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(copyTarget.textContent.trim());

    tooltip.style.opacity = "1";
    setTimeout(() => {
        tooltip.style.opacity = "0";
    }, 1200);
});