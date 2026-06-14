// tweaks-app.jsx — Tweaks island for the Neo-Brutalist portfolio.
// Reads/writes CSS custom properties on :root + body motion classes.
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent":   "#ff5277",
  "highlight":"#ffde00",
  "theme":    "paper",
  "border":   3,
  "shadow":   8,
  "marquee":  22,
  "motion":   "full"
}/*EDITMODE-END*/;

const THEMES = {
  paper: { "--paper": "#fdf6e3", "--panel": "#fffdf5", "--ink": "#111111" },
  white: { "--paper": "#ffffff", "--panel": "#f4f4f0", "--ink": "#111111" },
  night: { "--paper": "#15130d", "--panel": "#221d14", "--ink": "#fdf6e3" }
};

function applyTweaks(t) {
  const root = document.documentElement.style;
  root.setProperty('--pink', t.accent);
  root.setProperty('--yellow', t.highlight);
  root.setProperty('--bw', t.border + 'px');
  root.setProperty('--shadow', t.shadow + 'px');
  root.setProperty('--marquee-dur', t.marquee + 's');
  const theme = THEMES[t.theme] || THEMES.paper;
  Object.entries(theme).forEach(([k, v]) => root.setProperty(k, v));
  document.body.classList.toggle('motion-off', t.motion === 'off');
  document.body.classList.toggle('motion-calm', t.motion === 'calm');
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Color" />
      <TweakColor label="Accent" value={t.accent}
        options={["#ff5277", "#3b6cff", "#16a34a", "#ff6b35", "#a855f7"]}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="Highlight" value={t.highlight}
        options={["#ffde00", "#b6ff3c", "#00e0d0", "#ff9e00"]}
        onChange={(v) => setTweak('highlight', v)} />
      <TweakRadio label="Theme" value={t.theme}
        options={["paper", "white", "night"]}
        onChange={(v) => setTweak('theme', v)} />

      <TweakSection label="Brutalism" />
      <TweakSlider label="Border weight" value={t.border} min={1} max={6} step={1} unit="px"
        onChange={(v) => setTweak('border', v)} />
      <TweakSlider label="Shadow offset" value={t.shadow} min={0} max={16} step={1} unit="px"
        onChange={(v) => setTweak('shadow', v)} />

      <TweakSection label="Motion" />
      <TweakRadio label="Level" value={t.motion}
        options={["full", "calm", "off"]}
        onChange={(v) => setTweak('motion', v)} />
      <TweakSlider label="Marquee speed" value={t.marquee} min={8} max={40} step={1} unit="s"
        onChange={(v) => setTweak('marquee', v)} />
    </TweaksPanel>
  );
}

// Apply tweak values immediately (the EDITMODE block above is the persisted source
// of truth — the host rewrites it on change), then mount the panel.
(function bootstrap() {
  applyTweaks(TWEAK_DEFAULTS);
  ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
})();
