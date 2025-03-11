// Game functionality
function openGame(name, url) {
  const newWindow = window.open("about:blank", "_blank");
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>${name}</title>
          <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            embed { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <embed src="${url}" style="width: 100vw; height: 100vh;">
        </body>
      </html>
    `);
  }
}

// Fullscreen function for proxy (works the same as openGame)
function openFullscreen(name, url) {
  openGame(name, url); // Reuse the same function for consistency
}

// Links functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the game display if we're on the games or favorites page
  if (document.querySelector('.game-grid')) {
    updateGameDisplay();
  }

  // Only run this code on the links page
  if (!document.getElementById('links-container')) return;

  const links = [
    { title: "Benrogo", url: "https://Benrogo.site" },
    { title: "Beenshub", url: "https://Beenshub.org"},
    { title: "Beenshub", url: "https://Beenshub.xyz"},
    { title: "Beenshub", url: "https://Beenshub.shop"},
    { title: "Beenshub", url: "https://Mathhomework.online"},
    { title: "Beenshub", url: "https://Beenshub.politechnika-nova.edu.pl/"},
    { title: "Bryce Games", url: "https://Brycegames.online"},
    { title: "Beenshub", url: "https://Brycegs.shop"},
    { title: "Beenshub", url: "https://Vcsleepy.shop"},
  ];

  const linksPerPage = 15;
  let currentPage = 1;
  const totalPages = Math.ceil(links.length / linksPerPage);

  const linksContainer = document.getElementById('links-container');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const prevPageBtnBottom = document.getElementById('prevPageBottom');
  const nextPageBtnBottom = document.getElementById('nextPageBottom');
  const pageInfo = document.getElementById('pageInfo');
  const pageInfoBottom = document.getElementById('pageInfoBottom');

  function displayLinks(page) {
    linksContainer.innerHTML = '';

    const startIndex = (page - 1) * linksPerPage;
    const endIndex = Math.min(startIndex + linksPerPage, links.length);

    for (let i = startIndex; i < endIndex; i++) {
      const link = links[i];
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.className = 'link-card';
      linkElement.target = '_blank';
      linkElement.textContent = link.url;

      linksContainer.appendChild(linkElement);
    }

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    pageInfoBottom.textContent = `Page ${page} of ${totalPages}`;

    prevPageBtn.disabled = page === 1;
    nextPageBtn.disabled = page === totalPages;
    prevPageBtnBottom.disabled = page === 1;
    nextPageBtnBottom.disabled = page === totalPages;

    if (page === 1) {
      prevPageBtn.style.opacity = '0.5';
      prevPageBtnBottom.style.opacity = '0.5';
    } else {
      prevPageBtn.style.opacity = '1';
      prevPageBtnBottom.style.opacity = '1';
    }

    if (page === totalPages) {
      nextPageBtn.style.opacity = '0.5';
      nextPageBtnBottom.style.opacity = '0.5';
    } else {
      nextPageBtn.style.opacity = '1';
      nextPageBtnBottom.style.opacity = '1';
    }
  }

  prevPageBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  nextPageBtn.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  prevPageBtnBottom.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  nextPageBtnBottom.addEventListener('click', function() {
    if (currentPage < totalPages) {
      currentPage++;
      displayLinks(currentPage);
      window.scrollTo(0, 0);
    }
  });

  // Initialize with the first page
  displayLinks(currentPage);
});

// Initialize favorites on page load if we're on the games page
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.game-grid')) {
    updateGameDisplay();
  }
});
