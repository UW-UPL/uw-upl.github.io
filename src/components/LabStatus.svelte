<script>
  import Icon from "@iconify/svelte";

  const DOOR_URL = "https://doors.amoses.dev/door-status";
  const COUNT_URL =
    "https://raw.githubusercontent.com/UW-UPL/door-counter-v3/main/data/count.json";

  const REFRESH_MS = 60000;
  const TIMEOUT_MS = 5000;

  let doorOpen = $state(null);
  let doorSince = $state(null);
  let count = $state(null);
  let settled = $state(false);

  async function fetchJson(url) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function load() {
    const [door, people] = await Promise.allSettled([
      fetchJson(DOOR_URL),
      fetchJson(COUNT_URL),
    ]);

    if (door.status === "fulfilled") {
      doorOpen = door.value.status === "open";
      const at = new Date(door.value.last_updated);
      doorSince = Number.isNaN(at.valueOf()) ? null : at;
    }

    if (people.status === "fulfilled") {
      const parsed = Number(people.value.count);
      if (Number.isFinite(parsed)) count = Math.max(0, Math.round(parsed));
    }

    settled = true;
  }

  $effect(() => {
    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => clearInterval(timer);
  });

  const sinceLabel = $derived.by(() => {
    if (!doorSince) return "";

    const stamp = doorSince.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const abbr =
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        timeZoneName: "short",
      })
        .formatToParts(doorSince)
        .find((p) => p.type === "timeZoneName")?.value ?? "CT";

    const offsetIn = (tz) => {
      const utc = doorSince.toLocaleString("en-US", { timeZone: "UTC" });
      const local = doorSince.toLocaleString("en-US", { timeZone: tz });
      return new Date(utc) - new Date(local);
    };

    const viewerTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return offsetIn("America/Chicago") === offsetIn(viewerTz)
      ? stamp
      : `${stamp} ${abbr}`;
  });

  const joiner = $derived(doorOpen === count > 0 ? "and" : "but");

  const sep = $derived(count !== null ? "," : "");
</script>

{#if !settled}
  <p style="margin: 0;">Loading lab status...</p>
{:else if doorOpen === null && count === null}
  <p style="margin: 0;">Error loading lab status.</p>
{:else}
  <div
    style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.2rem;"
  >
    <p style="margin: 0;">
      {#if doorOpen === null}
        ...has
        {#if count === 0}
          <span style="color: rgb(183, 1, 1); font-weight: 600;">nobody</span>
          inside right now
        {:else if count === 1}
          <span style="color: green; font-weight: 600;">~1 person</span> inside right
          now
        {:else}
          <span style="color: green; font-weight: 600;">~{count} people</span>
          inside right now
        {/if}
      {:else}
        ...is
        {#if doorOpen}
          <span style="color: green; font-weight: 600;">open</span> right now{sep}
        {:else}
          <span style="color: rgb(183, 1, 1); font-weight: 600;">closed</span
          >{sep}
        {/if}
        {#if count !== null}
          {joiner}
          {#if count === 0}
            <span style="color: rgb(183, 1, 1); font-weight: 600;">nobody</span>
            seems to be inside
          {:else if count === 1}
            there's <span style="color: green; font-weight: 600;"
              >~1 person</span
            >
            inside
          {:else}
            there are
            <span style="color: green; font-weight: 600;">~{count} people</span>
            inside
          {/if}
        {/if}
        {#if sinceLabel}(since {sinceLabel}){/if}
      {/if}
    </p>
    {#if doorOpen !== null}
      <Icon
        icon={doorOpen
          ? "material-symbols:door-open-outline-rounded"
          : "material-symbols:door-front-outline-rounded"}
      />
    {/if}
    {#if count !== null}
      <Icon
        icon={count > 1
          ? "grommet-icons:group"
          : "material-symbols:person-outline"}
      />
    {/if}
  </div>
{/if}
