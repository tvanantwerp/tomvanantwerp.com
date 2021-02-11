---
layout: layouts/narrow-page.html
title: Who is this Tom VanAntwerp guy anyway?
---

Tom is a technologist living and working around Washington, DC. For roughly <span style="font-variant-numeric: tabular-nums" class="seconds-target">X</span> seconds (or about <span class="years-target">17</span> years) he's been designing and coding websites, creating interactive data visualizations, and building out IT infrastructure.

To see some examples of Tom's work, check out [projects](/projects).

To contact Tom, just yell really loud and maybe he'll hear you. Alternatively, get in touch via <a href="https://twitter.com/{{metadata.author.twitter}}" target="_blank" rel="noopener noreferrer">Twitter</a>.

<script>
  const secondsTarget = document.querySelector('.seconds-target');
  const yearsTarget = document.querySelector('.years-target');
  let ms = new Date().getTime() - new Date('2004-01-01').getTime();
  const msToYears = ms => ms/1000/60/60/24/365.25;

  secondsTarget.textContent = Intl.NumberFormat('en-US').format(Math.round(ms/1000));
  yearsTarget.textContent = Math.round(msToYears(ms * 10) / 10);

  setInterval(() => {
    ms = new Date().getTime() - new Date('2004-01-01').getTime();
    secondsTarget.textContent = Intl.NumberFormat('en-US').format(Math.round(ms/1000));
    yearsTarget.textContent = Math.round(msToYears(ms * 10) / 10);
  }, 1000);
</script>