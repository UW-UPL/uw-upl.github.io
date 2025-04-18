<script>
  import { onMount } from "svelte";

  let status = "Loading door status...";

  onMount(async () => {
    try {
      const res = await fetch("https://doors.amoses.dev/door-status");
      const data = await res.json();

      const back = data.find((d) => d.door === "back");
      const front = data.find((d) => d.door === "front");
      const open = back?.status === "on" && front?.status === "on";

      status = open
        ? '...is <span style="color: green; font-weight: 600;">open</span> right now!'
        : '...is <span style="color: red; font-weight: 600;">closed</span> right now.';
    } catch {
      status = "Error loading door status.";
    }
  });
</script>

<p>{@html status}</p>
