<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  const COUNT_URL =
    "https://raw.githubusercontent.com/UW-UPL/door-counter-v3/main/data/count.json";

  let count = null;
  let failed = false;

  onMount(async () => {
    try {
      const res = await fetch(COUNT_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const parsed = Number(data.count);
      if (!Number.isFinite(parsed)) throw new Error("bad count");
      count = Math.max(0, Math.round(parsed));
    } catch {
      // If the count can't be fetched, render nothing rather than an error line
      failed = true;
    }
  });
</script>

{#if !failed && count !== null}
  <div
    style="display: flex; align-items: center; justify-content: center; gap: 0.2rem;"
  >
    <p style="margin: 0;">
      {#if count === 0}
        ...and <span style="color: rgb(183, 1, 1); font-weight: 600;">nobody</span> seems to be inside right now
      {:else if count === 1}
        ...and there is <span style="color: green; font-weight: 600;">~1 person</span> inside
      {:else}
        ...and there are <span style="color: green; font-weight: 600;">~{count} people</span> inside
      {/if}
    </p>
    {#if count > 1}
      <Icon icon="grommet-icons:group" />
    {:else}
      <Icon icon="material-symbols:person-outline" />
    {/if}
  </div>
{/if}
