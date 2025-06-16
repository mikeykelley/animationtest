<script>
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".amount").forEach(el => {
      const target = +el.dataset.value;
      let current = 0;

      const update = () => {
        current += Math.ceil((target - current) / 15);
        if (current >= target) {
          el.textContent = `£${target.toLocaleString()}`;
        } else {
          el.textContent = `£${current.toLocaleString()}`;
          requestAnimationFrame(update);
        }
      };
      update();
    });
  });
</script>
