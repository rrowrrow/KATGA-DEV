import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const snapshot =
  await getDocs(
    collection(
      db,
      "results"
    )
  );

const results =
  snapshot.docs.map(
    doc => doc.data()
  );

const totalGames =
  results.length;

const wins =
  results.filter(
    r => r.result === "win"
  ).length;

const loses =
  results.filter(
    r => r.result === "lose"
  ).length;

const uniquePlayers =
  new Set(
    results.map(
      r => r.playerId
    )
  ).size;

const winRate =
  totalGames
    ? (
        wins /
        totalGames *
        100
      ).toFixed(1)
    : 0;

document.getElementById(
  "summary"
).innerHTML = `

<div class="card">
  Total Game:
  ${totalGames}
</div>

<div class="card">
  Pemain Unik:
  ${uniquePlayers}
</div>

<div class="card">
  Menang:
  ${wins}
</div>

<div class="card">
  Kalah:
  ${loses}
</div>

<div class="card">
  Win Rate:
  ${winRate}%
</div>

`;
