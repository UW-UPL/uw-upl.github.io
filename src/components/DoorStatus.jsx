import { useState, useEffect } from 'preact/hooks';

export default function DoorStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('https://doors.amoses.dev/door-status');
        const data = await res.json();
        const back  = data.find(d => d.door === 'back');
        const front = data.find(d => d.door === 'front');
        const open  = back?.status === 'on' && front?.status === 'on';
        setStatus(open ? 'doors open' : 'doors closed');
      } catch {
        setStatus('');
      }
    })();
  }, []);

  let color = '#dc2626'; // closed / error
  if (status === 'doors open') color = '#16a34a';

  return (
    <p class="doorstatus" style={{ color }}>
      {status ?? '…'}
    </p>
  );
}
