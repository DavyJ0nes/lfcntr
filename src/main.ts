import "./style.css";
import { setupCounter } from "./counter.ts";

function main() {
	const player1 = document.querySelector<HTMLDivElement>(".player-1")!;
	const player2 = document.querySelector<HTMLDivElement>(".player-2")!;

	setupCounter(player1);
	setupCounter(player2);
}

main();
