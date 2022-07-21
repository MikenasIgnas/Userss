import { firstLetterUpercase } from './utility.js';

const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get('user_id');

const createHeader = () => {
  const headerContainer = document.getElementById('headerContainer');
  const header = document.createElement('div');
  const headerItems = document.createElement('div');

  const searchForm = document.createElement('Form');
  const inputElement = document.createElement('input');
  const selectElement = document.createElement('select');
  const createPostButton = document.createElement('button');
  const createUserButton = document.createElement('button');

  const createHeaderElement = (elementType, textContent, href) => {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    element.href = href;
    element.classList.add('hover-underline-animation');
    return element;
  };
  const homeElement = createHeaderElement('a', 'HOME', './index.html');
  const usersElement = createHeaderElement('a', 'USERS', './allUsers.html');
  const postsElement = createHeaderElement('a', 'POSTS', './allUsersPosts.html');
  const albumsElement = createHeaderElement('a', 'ALBUMS', './allUserAlbums.html');

  const userOption = createHeaderElement('option', 'User', '');
  const postsOption = createHeaderElement('option', 'Posts', '');
  const albumOption = createHeaderElement('option', 'Album', '');

  const postButtom = (button, buttonText, location) => {
    button.style.width = '70px';
    button.style.height = '20px';
    button.value = 'create';
    button.textContent = buttonText;
    button.style.fontSize = '10px';
    button.addEventListener('click', () => {
      window.location.assign(location);
    });
  };

  postButtom(createPostButton, 'Create Post', './createPost.html');
  postButtom(createUserButton, 'Create User', './createUser.html');

  inputElement.placeholder = 'Search For User';
  inputElement.name = 'search';
  selectElement.name = 'variations';
  header.classList.add('header');
  headerItems.classList.add('headerItems');

  selectElement.append(userOption, postsOption, albumOption);
  searchForm.append(inputElement, selectElement);
  headerContainer.append(header);
  header.append(headerItems);
  selectElement.addEventListener('click', (e) => {
    const select = e.target.value;
    inputElement.placeholder = `Search For ${select}`;
  });
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchVariation = e.target.elements.variations.value;
    const searchInput = e.target.elements.search.value;
    const searchNameInput = firstLetterUpercase(e.target.elements.search.value);
    const searchFunction = ({
      fetchUrlEnd,
      searchDataName,
      createRedirectUrl,
    }) => {
      fetch(`https://jsonplaceholder.typicode.com/${fetchUrlEnd}`)
        .then((res) => res.json())
        .then((data) => {
          data.map((dataItem) => {
            if (
              (searchInput !== ''
                && dataItem?.[searchDataName].includes(searchInput))
              || dataItem?.[searchDataName].includes(searchNameInput)
            ) {
              window.location.assign(createRedirectUrl(dataItem));
            }
            return dataItem;
          });
        });
    };
    if (searchVariation === userOption.textContent) {
      const createUserUrl = (user) => `./oneUser.html?user_id=${user.id}`;
      searchFunction({
        fetchUrlEnd: 'users',
        searchDataName: 'name',
        createRedirectUrl: createUserUrl,
      });
    } else if (searchVariation === albumOption.textContent) {
      const createAlbumUrl = (album) => `./albumSearchPage.html?user_id=${userId}&album_id=${album.id}&album_title=${album.title}&search_word=${searchInput}`;
      searchFunction({
        fetchUrlEnd: `albums?user_id=${userId}`,
        searchDataName: 'title',
        createRedirectUrl: createAlbumUrl,
      });
    } else if (searchVariation === postsOption.textContent) {
      const createPostmUrl = (post) => `./postSearchPage.html?user_id=${userId}&post=${post.id}&post_title=${post.title}&search_word=${searchInput}`;
      searchFunction({
        fetchUrlEnd: `posts?user_id=${userId}`,
        searchDataName: 'title',
        createRedirectUrl: createPostmUrl,
      });
    }

    inputElement.value = '';
  });

  headerItems.append(
    homeElement,
    usersElement,
    postsElement,
    albumsElement,
    searchForm,
    createPostButton,
    createUserButton,
  );
};
export { createHeader };
