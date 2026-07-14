import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyB-6lfqdfOzqfoDp118bpvi7SmNufTU9Y8",

  authDomain: "katga-bd583.firebaseapp.com",

  projectId: "katga-bd583",

  storageBucket: "katga-bd583.firebasestorage.app",

  messagingSenderId: "70271543625",

  appId: "1:70271543625:web:f4fa186d5d98391b95d298",

  measurementId: "G-QB23BTQYPV"

};

const app =
  initializeApp(firebaseConfig);

const db =
  getFirestore(app);

async function loadDashboard() {

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
      Total Game: ${totalGames}
    </div>

    <div class="card">
      Pemain Unik: ${uniquePlayers}
    </div>

    <div class="card">
      Menang: ${wins}
    </div>

    <div class="card">
      Kalah: ${loses}
    </div>

    <div class="card">
      Win Rate: ${winRate}%
    </div>

  `;
}

loadDashboard();
