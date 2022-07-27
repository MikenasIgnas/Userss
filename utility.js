export const firstLetterUpercase = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
export const paginationfunc = () => {
  const queryParams = document.location.search;
  const urlParams = new URLSearchParams(queryParams);
  const postPage = urlParams.get('_start');
  const paginationContainer = document.createElement('div');
  const bodyEl = document.querySelector('body');
  const firstPage = document.createElement('a');
  const prev = document.createElement('a');
  firstPage.textContent = 'First';
  prev.textContent = 'Prev';
  paginationContainer.append(firstPage, prev);
  bodyEl.append(paginationContainer);
  paginationContainer.classList.add('paginationContainer');
  paginationContainer.style.display = 'flex';
  paginationContainer.style.justifyContent = 'space-around';
  paginationContainer.style.width = '30%';
  paginationContainer.style.height = '50px';
  paginationContainer.style.margin = 'auto';
  paginationContainer.style.alignItems = 'center';
  paginationContainer.style.fontSize = '20px';
  // eslint-disable-next-line no-plusplus
  const pageFunc = () => {
    const pageNum = [];
    for (let i = 0; i < 10; i++) {
      const pageElement = document.createElement('a');
      pageElement.id = i + 1;
      paginationContainer.append(pageElement);
      pageElement.href = `./allUsersPosts.html?_start=${i * 10}&_limit=10`;
      pageElement.textContent = i + 1;
      pageNum.push(Number(pageElement.textContent));
      pageElement.classList.add('hover-underline-animation');
      const pageNumbersEl = document.getElementById(pageNum[i]);
      if ((Number(postPage) + 10) / 10 === Number(pageNumbersEl.textContent)) {
        pageNumbersEl.style.color = 'red';
      }
    }
  };
  pageFunc();
  const next = document.createElement('a');
  next.textContent = 'Next';
  const lastPage = document.createElement('a');
  lastPage.textContent = 'Last';
  if (postPage >= 10) {
    firstPage.href = `./allUsersPosts.html?_start=${0}&_limit=10`;
  }
  if (postPage <= 80) {
    lastPage.href = `./allUsersPosts.html?_start=${90}&_limit=10`;
  }
  if (postPage < 90) {
    next.href = `./allUsersPosts.html?_start=${Number(postPage) + 10}&_limit=10`;
  }
  if (postPage > 10) {
    prev.href = `./allUsersPosts.html?_start=${Number(postPage) - 10}&_limit=10`;
  }
  paginationContainer.append(next, lastPage);
  return postPage;
};
