type CounterOptions = {
	startingLife?: number;
};

export function setupCounter(
	element: HTMLDivElement,
	options: CounterOptions = {},
) {
	const startingLife = options.startingLife ?? 20;
	const baseUrl = import.meta.env.BASE_URL;
	let counter = startingLife;

	const zoneUp = element.querySelector<HTMLDivElement>(".zone-up");
	const zoneDown = element.querySelector<HTMLDivElement>(".zone-down");
	const display = element.querySelector<HTMLDivElement>(".life-display-count");
	const heart = element.querySelector<HTMLImageElement>(".life-display-heart");

	if (!zoneUp || !zoneDown || !display || !heart) {
		throw new Error("Counter: required elements not found");
	}
	const heartSrc = `${baseUrl}heart-solid-full.svg`;
	const skullSrc = `${baseUrl}skull-solid-full.svg`;

	const setCounter = (count: number) => {
		counter = Math.max(0, count);
		display.textContent = String(counter);
		heart.src = counter <= 0 ? skullSrc : heartSrc;
		heart.alt = counter <= 0 ? "Dead" : "Life";
	};

	zoneUp.addEventListener("click", () => setCounter(counter + 1));
	zoneDown.addEventListener("click", () => setCounter(counter - 1));

	setCounter(startingLife);

	return {
		getCount: () => counter,
		setCount: setCounter,
	};
}
