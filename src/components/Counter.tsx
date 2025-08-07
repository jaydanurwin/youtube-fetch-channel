import { html } from "hono/html";

const script = html`
<script type="module">
import canvasConfetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm";
let count = 0;
window.increment = () => {
  count++;
  const counterElement = document.getElementById("counter-count");
  if (counterElement) {
      counterElement.textContent = count.toString();
  }
  if (count === 3) {
    canvasConfetti({ particleCount: 100, colors: ["#cdac26", "#d0d0d1", "#292929", "#1b791f"], spread: 70, origin: { y: 0.6 } });
  }
};
</script>
`;

export function Counter() {
  return (
    <sapling-island loading="visible">
      <template dangerouslySetInnerHTML={{__html: script.toString()}} />
      <div class="w-full h-full flex items-center justify-center">
        <button
          id="counter-button"
          onclick="window.increment?.()" 
          class="px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition duration-150 flex items-center gap-2 shadow-lg">
          Click Count: <span id="counter-count">0</span>
        </button>
      </div>
    </sapling-island>
  );
}