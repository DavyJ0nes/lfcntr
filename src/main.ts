import "./style.css";
import { setupCounter } from "./counter.ts";

type GameState = {
	lifePoints: number;
	p1: string;
	p2: string;
};

function main() {
	const player1 = document.querySelector<HTMLDivElement>(".player-1");
	const player2 = document.querySelector<HTMLDivElement>(".player-2");
	const menuButton = document.querySelector<HTMLButtonElement>(".menu-button");
	const menu = document.querySelector<HTMLDivElement>(".menu");
	const menuClose = document.querySelector<HTMLButtonElement>(".menu-close");
	const menuApply = document.querySelector<HTMLButtonElement>(".menu-apply");
	const startingLifeInput =
		document.querySelector<HTMLInputElement>("#starting-life");
	const palettes = document.querySelectorAll<HTMLDivElement>(".palette");
	const swatches =
		document.querySelectorAll<HTMLButtonElement>(".palette-swatch");

	if (
		!player1 ||
		!player2 ||
		!menuButton ||
		!menu ||
		!menuClose ||
		!menuApply ||
		!startingLifeInput
	) {
		throw new Error("Required DOM elements not found");
	}

	const state: GameState = {
		lifePoints: 20,
		p1: "#69d88a",
		p2: "#a48bff",
	};

	const counter1 = setupCounter(player1, { startingLife: state.lifePoints });
	const counter2 = setupCounter(player2, { startingLife: state.lifePoints });

	swatches.forEach((swatch) => {
		const color = swatch.dataset.color;
		if (color) swatch.style.setProperty("--swatch", color);
	});

	const applyColors = () => {
		player1.style.setProperty("--player-color", state.p1);
		player2.style.setProperty("--player-color", state.p2);
	};

	const openMenu = () => {
		startingLifeInput.value = String(state.lifePoints);
		palettes.forEach((palette) => {
			const player = palette.dataset.player;
			const selectedPlayer = player === "p1" ? state.p1 : state.p2;
			palette
				.querySelectorAll<HTMLButtonElement>(".palette-swatch")
				.forEach((btn) => {
					btn.classList.toggle(
						"is-selected",
						btn.dataset.color === selectedPlayer,
					);
				});
		});
		menu.setAttribute("data-open", "true");
	};

	const closeMenu = () => {
		menu.removeAttribute("data-open");
	};

	menuButton.addEventListener("click", openMenu);
	menuClose.addEventListener("click", closeMenu);
	menu.addEventListener("click", (e) => {
		if (e.target === menu) closeMenu();
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});

	menuApply.addEventListener("click", () => {
		const newLife = Number.parseInt(startingLifeInput.value, 10);
		if (Number.isFinite(newLife) && newLife > 0) {
			state.lifePoints = newLife;
			counter1.setCount(newLife);
			counter2.setCount(newLife);
		}
		applyColors();
		closeMenu();
	});

	palettes.forEach((palette) => {
		palette.addEventListener("click", (event) => {
			if (!(event.target instanceof HTMLButtonElement)) return;
			const color = event.target.dataset.color;
			if (!color) return;
			const player = palette.dataset.player;
			if (player === "p1") {
				state.p1 = color;
			} else if (player === "p2") {
				state.p2 = color;
			}
			palette
				.querySelectorAll<HTMLButtonElement>(".palette-swatch")
				.forEach((btn) => {
					btn.classList.toggle("is-selected", btn === event.target);
				});
		});
	});

	applyColors();
}

main();
