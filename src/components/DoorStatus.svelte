<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  let status = "Loading door status...";
  let openSave = null;

  onMount(async () => {
    try {
      const res = await fetch("https://doors.amoses.dev/door-status");
      const data = await res.json();

      const open = data.status === "open";
      openSave = open;

      status = open
        ? '...is <span style="color: green; font-weight: 600;">open</span> right now!'
        : '...is <span style="color: rgb(183, 1, 1); font-weight: 600;">closed</span> right now.';
    } catch {
      status = "Error loading door status.";
    }
  });
</script>

<div
  style="display: flex; align-items: center; justify-content: center; gap: 0.1rem;"
>
  <p style="margin: 0;">{@html status}</p>
  {#if openSave}
    <Icon icon="material-symbols:door-open-outline-rounded" />
  {:else}
    <Icon icon="material-symbols:door-front-outline-rounded" />
  {/if}
</div>
