function setupMovableWindow(movableWindow: HTMLDivElement) {
  let xOffset = 0;
  let yOffset = 0;

  function updateLocation(x: number, y: number) {
    xOffset += x;
    yOffset += y;
    movableWindow.style.top = `calc(50vh - ${movableWindow.clientHeight / 2}px + ${yOffset}px)`;
    movableWindow.style.left = `calc(50vw - ${movableWindow.clientWidth / 2}px + ${xOffset}px)`;
  }
  const bar = movableWindow.getElementsByClassName("window-bar")[0];

  if (!bar) {
    return;
  }

  function cursorToggle() {
    bar.classList.toggle("cursor-grab");
    bar.classList.toggle("cursor-grabbing");
  }

  function mouseDown() {
    cursorToggle();
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(event: MouseEvent) {
    updateLocation(event.movementX, event.movementY);
  }

  function mouseUp() {
    cursorToggle();
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  bar.addEventListener("mousedown", mouseDown);

  updateLocation(0, 0);
}

export { setupMovableWindow };
