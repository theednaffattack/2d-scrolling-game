import { Player } from "./player";

export function drawState(element: HTMLElement, player: Player) {
  const frag = document.createDocumentFragment();
  const {
    position: { x, y },
  } = player;
  const xmlString = `<div id='player-state'>
  <p>Player</p>
  <p>x: ${x}</p> <p>y: ${y}</p></div>`;
  const newDocumentNode = new DOMParser().parseFromString(
    xmlString,
    "text/xml"
  );
  // We'll grab the div we want;
  const playerState = newDocumentNode.firstChild;
  if (playerState) {
    element.appendChild(playerState);
  }
  // const playerState = document.createElement("div");
  // playerState.className = "player-state";
  // frag.appendChild(playerState);
}
