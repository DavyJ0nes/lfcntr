export function setupCounter(
	element: HTMLDivElement,
	startingLife: number = 20,
) {
	let counter = startingLife;
	const zoneUp = element.querySelector<HTMLDivElement>(".zone-up")!;
	const zoneDown = element.querySelector<HTMLDivElement>(".zone-down")!;
	const display = element.querySelector<HTMLDivElement>(".life-display-count")!;

	const setCounter = (count: number) => {
		counter = count;
		if (counter <= 0) {
			display.innerHTML = `💀`;
		} else {
			display.innerHTML = `${counter}`;
		}
	};

	zoneUp.addEventListener("click", () => setCounter(counter + 1));
	zoneDown.addEventListener("click", () => setCounter(counter - 1));

	setCounter(startingLife);
}
