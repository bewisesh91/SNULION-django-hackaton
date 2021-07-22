// 리스트뷰, 카드뷰 토글 관련
const listOn = () => {
  document.getElementById('list-container').classList.remove('no-display');
  document.getElementById('card-container').classList.add('no-display');
  document.getElementById('card-view').classList.add('no-display');
  document.getElementById('list-view').classList.remove('no-display');
};

const cardOn = () => {
  document.getElementById('list-container').classList.add('no-display');
  document.getElementById('card-container').classList.remove('no-display');
  document.getElementById('card-view').classList.remove('no-display');
  document.getElementById('list-view').classList.add('no-display');
};

const onClickViewButton = (event) => {
  const img = document.getElementById('view-select');
  const imgWidth = img.offsetWidth;
  const x = event.pageX - img.offsetLeft;

  x < imgWidth / 2 ? listOn() : cardOn();
};

// 리스트뷰 노트 edit, delete 관련
const showNoteActionBtns = (noteId) => {
  const editHasHide = document
    .getElementById(`${noteId}-edit-btn`)
    .classList.contains('no-visibility');
  const deleteHasHide = document
    .getElementById(`${noteId}-delete-btn`)
    .classList.contains('no-visibility');
  if (editHasHide && deleteHasHide) {
    document
      .getElementById(`${noteId}-edit-btn`)
      .classList.remove('no-visibility');
    document
      .getElementById(`${noteId}-delete-btn`)
      .classList.remove('no-visibility');
  }
};

const hideNoteActionBtns = (noteId) => {
  const editHasHide = document
    .getElementById(`${noteId}-edit-btn`)
    .classList.contains('no-visibility');
  const deleteHasHide = document
    .getElementById(`${noteId}-delete-btn`)
    .classList.contains('no-visibility');
  if (!editHasHide && !deleteHasHide) {
    document
      .getElementById(`${noteId}-edit-btn`)
      .classList.add('no-visibility');
    document
      .getElementById(`${noteId}-delete-btn`)
      .classList.add('no-visibility');
  }
};

const getTagNames = () => {
  const tagsSpanElements = document.getElementsByClassName('tag-span');
  const tagsArray = [];
  [...tagsSpanElements].forEach((span) => {
    tagsArray.push(span.innerHTML);
  });

  return tagsArray.join(' ');
};

const makeTagElements = (str) => {
  const tagArray = str.split(' ');
  const spanElements = [];
  tagArray.forEach((string) => {
    const newTag = document.createElement('span');
    newTag.classList.add('tag-style');
    newTag.classList.add('tag-span');
    newTag.innerHTML = string;
    spanElements.push(newTag);
  });

  console.log(spanElements);
  return spanElements;
};

// 리스트뷰에서 노트 수정, 삭제
const editNote = (noteId, noteName, noteComment, noteLinkTitle) => {
  const nameElement = document.getElementById(`note-name-${noteId}`);
  nameElement.innerHTML = `<input id="edit-name-${noteId}" type="text", value="${noteName}", name="name"></input>`;

  const commentElement = document.getElementById(`note-comment-${noteId}`);
  commentElement.innerHTML = `<input id="edit-comment-${noteId}" type="text", value="${noteComment}" name="comment"></input>`;

  const linkElement = document.getElementById(`note-link-${noteId}`);
  linkElement.innerHTML = `<input id="edit-link-${noteId}" type="text", value="${noteLinkTitle}" name="link-title"></input>`;

  const tagElement = document.getElementById(`note-tag-${noteId}`);
  tagElement.innerHTML = `<input id="edit-tag-${noteId}" type="text", value="${getTagNames()}" name="tag"></input>`;

  // 업데이트 버튼 나오고 edit delete 버튼 안 나오게
  document
    .getElementById(`${noteId}-update-btn`)
    .classList.remove('no-display');
  document.getElementById(`${noteId}-edit-btn`).classList.add('no-display');
  document.getElementById(`${noteId}-delete-btn`).classList.add('no-display');
};

const updateNote = async (folderId, noteId) => {
  const editNameElement = document.getElementById(`edit-name-${noteId}`);
  const editCommentElement = document.getElementById(`edit-comment-${noteId}`);
  const editLinkElement = document.getElementById(`edit-link-${noteId}`);
  const editTagElement = document.getElementById(`edit-tag-${noteId}`);

  const newTagElements = makeTagElements(editTagElement.value);

  let data = new FormData();
  data.append('noteName', editNameElement.value);
  data.append('noteComment', editCommentElement.value);
  data.append('noteLinkTitle', editLinkElement.value);
  data.append('tag', editTagElement.value);
  axios.post(`/codingnote/dashboard/${folderId}/${noteId}/updatenote/`, data);

  document.getElementById(`note-name-${noteId}`).innerHTML =
    editNameElement.value;
  document.getElementById(`note-comment-${noteId}`).innerHTML =
    editCommentElement.value;
  document.getElementById(`note-link-${noteId}`).innerHTML =
    editLinkElement.value;

  newTagElements.forEach((span) => {
    document.getElementById(`note-tag-${noteId}`).appendChild(span);
  });

  document.getElementById(`${noteId}-update-btn`).classList.add('no-display');
  document.getElementById(`${noteId}-edit-btn`).classList.remove('no-display');
  document
    .getElementById(`${noteId}-delete-btn`)
    .classList.remove('no-display');
  document.getElementById(`edit-tag-${noteId}`).remove();
};

const deleteNote = async (folderId, noteId) => {
  const alert = window.confirm('해당 노트를 삭제하시겠습니까?');
  if (alert) {
    const response = await axios.delete(
      `/codingnote/dashboard/${folderId}/${noteId}/deletenote`
    );
    document.getElementById(`each-note-${noteId}`).remove();
    document.getElementById(
      'content-note-num'
    ).innerHTML = `${response.data.notesNum}개`;
  }
};

// TODO : 아래 수정하기
const addNote = (folderId) => {
  const noteElement = document.getElementById('table-body');
  let newTabletr = document.createElement('tr');
  let newTableName = document.createElement('td');
  newTableName.setAttribute('id', 'new-name-row');
  newTableName.innerHTML = `<input id="table-name-${folderId}" type="text", placeholder="(필수)제목을 입력해주세요.", name="name"></input>`;
  let newTableComment = document.createElement('td');
  newTableComment.setAttribute('id', 'new-comment-row');
  newTableComment.innerHTML = `<input id="table-comment-${folderId}" type="text", placeholder="(선택)코멘트를 입력해주세요.", name="comment"></input>`;
  let newTableWebsite = document.createElement('td');
  newTableWebsite.setAttribute('id', 'new-website-row');
  newTableWebsite.innerHTML = `<input id="table-website-${folderId}" type="text", placeholder="(필수)url을 입력해주세요.", name="link-title"></input>`;
  let newTableTag = document.createElement('td');
  newTableTag.setAttribute('id', 'new-tag-row');
  newTableTag.innerHTML = `<input id="table-tag-${folderId}" type="text", placeholder="(선택)태그를 입력해주세요.", name="tag"></input>`;
  let newTableAction = document.createElement('td');
  let newTableSaveButton = document.createElement('button');
  newTableSaveButton.setAttribute('class', 'save');
  newTableSaveButton.setAttribute('id', `${folderId}-save-btn`);
  newTableSaveButton.setAttribute('onclick', `onClickSaveButton(${folderId})`);
  newTableSaveButton.innerHTML =
    '<img class="save-img" src="/static/img/save-update.svg" />';

  newTableAction.append(newTableSaveButton);
  noteElement.appendChild(newTabletr);
  newTabletr.append(
    newTableName,
    newTableComment,
    newTableWebsite,
    newTableTag,
    newTableAction
  );
};
