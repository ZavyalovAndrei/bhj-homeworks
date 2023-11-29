document.addEventListener("click", (event) => {
  event.preventDefault();
  const classArray = [...event.target.classList];
  if (classArray.includes("has-tooltip")) {
    const tooltipText = event.target.getAttribute("title");
    const currentTooltip = checkTooltips(tooltipText);
    if (currentTooltip === null) {
      event.target.insertAdjacentHTML(
        "afterend",
        '<div class="tooltip tooltip_active" style="left: 0; top: 0">' +
          tooltipText +
          "</div>"
      );
      const tooltipElement = document.querySelector(".tooltip_active");
      tooltipElement.dataset.position = changePosition(tooltipElement, event.target);
    } else {
        currentTooltip.classList.toggle("tooltip_active");
        currentTooltip.dataset.position = changePosition(currentTooltip, event.target);
      }
  }
});

function checkTooltips(currentText) {
  let result = null;
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    if (tooltip.textContent === currentText) {
      result =  tooltip;
    } else {
      tooltip.classList.remove("tooltip_active");
    }
  });
  return result;
}

function changePosition(element, linkElement) {
  const tooltipParameters = element.getBoundingClientRect();
  const textParameters = linkElement.getBoundingClientRect();
  let position = "bottom";
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  let xPosition =
    textParameters.left +
    0.5 * textParameters.width -
    0.5 * tooltipParameters.width;
  let yPosition = textParameters.bottom + 5;
  const rightPositionCheck = xPosition + 5;
  const lefttPositionCheck =
    windowWidth - xPosition - tooltipParameters.width + 5;
  const topPositionCheck = windowHeight - yPosition - tooltipParameters.height;
  if (rightPositionCheck < 0) {
    position = "right";
    xPosition = textParameters.right + 5;
    yPosition =
      textParameters.top +
      0.5 * textParameters.height -
      0.5 * tooltipParameters.height;
  } else if (lefttPositionCheck < 0) {
    position = "left";
    xPosition = textParameters.left - tooltipParameters.width - 5;
    yPosition =
      textParameters.top +
      0.5 * textParameters.height -
      0.5 * tooltipParameters.height;
  } else if (topPositionCheck < 0) {
    position = "top";
    yPosition = textParameters.top - tooltipParameters.height - 5;
  }

  element.setAttribute(
    "style",
    "left: " + xPosition + "px; top: " + yPosition + "px"
  );
  return position;
}
