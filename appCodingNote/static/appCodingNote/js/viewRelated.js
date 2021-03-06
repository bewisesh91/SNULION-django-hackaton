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

const showNoteActionBtns = (noteId) => {
  const editHasHide = document
    .getElementById(`${noteId}-edit-btn`)
    .classList.contains('no-visibility');
  const deleteHasHide = document
    .getElementById(`${noteId}-delete-btn`)
    .classList.contains('no-visibility');
  const overflowHasHide = document
    .getElementById(`${noteId}-overflow-btn`)
    .classList.contains('no-visibility');

  if (editHasHide && deleteHasHide && overflowHasHide) {
    document
      .getElementById(`${noteId}-edit-btn`)
      .classList.remove('no-visibility');
    document
      .getElementById(`${noteId}-delete-btn`)
      .classList.remove('no-visibility');
    document
      .getElementById(`${noteId}-overflow-btn`)
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
  const overflowHasHide = document
    .getElementById(`${noteId}-overflow-btn`)
    .classList.contains('no-visibility');

  if (!editHasHide && !deleteHasHide && !overflowHasHide) {
    document
      .getElementById(`${noteId}-edit-btn`)
      .classList.add('no-visibility');
    document
      .getElementById(`${noteId}-delete-btn`)
      .classList.add('no-visibility');
    document
      .getElementById(`${noteId}-overflow-btn`)
      .classList.add('no-visibility');
  }
};

const getTagNames = (noteId) => {
  const tagsSpanElements = document.getElementsByClassName(
    `tag-span-${noteId}`
  );
  const tagsArray = [];
  [...tagsSpanElements].forEach((span) => {
    tagsArray.push(span.innerHTML);
  });

  return tagsArray.join(' ');
};

const editNote = (folderId, noteId, noteName, noteComment, noteLink) => {
  const nameElement = document.getElementById(`note-name-${noteId}`);
  nameElement.innerHTML = `<input id="edit-name-${noteId}" type="text", value="${noteName}", name="name", placeholder="(??????)????????? ??????????????????." onKeypress="javascript:if(event.keyCode==13) {updateNote(${folderId}, ${noteId})}"></input>`;

  const newInputElement = document.getElementById(`edit-name-${noteId}`);
  newInputElement.setSelectionRange(noteName.length, noteName.length);
  newInputElement.focus();

  const commentElement = document.getElementById(`note-comment-${noteId}`);
  commentElement.innerHTML = `<input id="edit-comment-${noteId}" type="text", value="${noteComment}" name="comment" placeholder="(??????)???????????? ??????????????????." onKeypress="javascript:if(event.keyCode==13) {updateNote(${folderId}, ${noteId})}"></input>`;
  document.getElementById(`edit-comment-${noteId}`);

  const linkElement = document.getElementById(`note-link-${noteId}`);
  linkElement.innerHTML = `<input id="edit-link-${noteId}" type="text", value="${noteLink}" name="link-title" placeholder="(??????)URL??? ??????????????????." onKeypress="javascript:if(event.keyCode==13) {updateNote(${folderId}, ${noteId})}"></input>`;

  const tagElement = document.getElementById(`note-tag-${noteId}`);
  tagElement.innerHTML = `<input id="edit-tag-${noteId}" type="text", value="${getTagNames(
    noteId
  )}" name="tag" placeholder="(??????)????????? ??????????????????." onKeypress="javascript:if(event.keyCode==13) {updateNote(${folderId}, ${noteId})}"></input>`;

  document
    .getElementById(`${noteId}-update-btn`)
    .classList.remove('no-display');
  document.getElementById(`${noteId}-edit-btn`).classList.add('no-display');
  document.getElementById(`${noteId}-delete-btn`).classList.add('no-display');
  document.getElementById(`${noteId}-overflow-btn`).classList.add('no-display');
};

const updateNote = async (folderId, noteId) => {
  const editNameElement = document.getElementById(`edit-name-${noteId}`);
  const editCommentElement = document.getElementById(`edit-comment-${noteId}`);
  const editLinkElement = document.getElementById(`edit-link-${noteId}`);
  const editTagElement = document.getElementById(`edit-tag-${noteId}`);
  const reg_editUrl =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  
  if (editNameElement.value === '') {
    alert('?????? ????????? ????????? ??????????????????.');
  } else if (reg_editUrl.test(editLinkElement.value)) {
    let data = new FormData();
    data.append('noteName', editNameElement.value);
    data.append('noteComment', editCommentElement.value);
    data.append('noteLink', editLinkElement.value);
    data.append('tag', editTagElement.value);

    try {
      await axios.post(`/dashboard/${folderId}/${noteId}/updatenote/`, data);
      window.location.reload();
    } catch (e) {
      alert('????????? URL??? ??????????????????.');
    }
  } else {
    alert('????????? URL??? ??????????????????.');
  }
};

const deleteNote = async (folderId, noteId) => {
  const alert = window.confirm('?????? ????????? ?????????????????????????');
  if (alert) {
    await axios.delete(`/dashboard/${folderId}/${noteId}/deletenote`);

    window.location.reload();
  }
};

const addNote = (folderId) => {
  const noteElement = document.getElementById('table-body');
  const newTabletr = document.createElement('tr');
  const newTableName = document.createElement('td');
  newTableName.setAttribute('id', 'new-name-row');
  newTableName.innerHTML = `<input id="table-name-${folderId}" type="text", placeholder="(??????)????????? ??????????????????.", name="name" onKeypress="javascript:if(event.keyCode==13) {saveNote(${folderId})}"></input>`;

  const newTableComment = document.createElement('td');
  newTableComment.setAttribute('id', 'new-comment-row');
  newTableComment.innerHTML = `<input id="table-comment-${folderId}" type="text", placeholder="(??????)???????????? ??????????????????.", name="comment" onKeypress="javascript:if(event.keyCode==13) {saveNote(${folderId})}"></input>`;

  const newTableWebsite = document.createElement('td');
  newTableWebsite.setAttribute('id', 'new-website-row');
  newTableWebsite.innerHTML = `<input id="table-website-${folderId}" type="text", placeholder="(??????)URL??? ??????????????????.", name="link" onKeypress="javascript:if(event.keyCode==13) {saveNote(${folderId})}"></input>`;

  const newTableTag = document.createElement('td');
  newTableTag.setAttribute('id', 'new-tag-row');
  newTableTag.innerHTML = `<input id="table-tag-${folderId}" type="text", placeholder="(??????)????????? ??????????????????.", name="tag" onKeypress="javascript:if(event.keyCode==13) {saveNote(${folderId})}"></input>`;

  const newTableAction = document.createElement('td');
  const newTableSaveButton = document.createElement('button');
  newTableSaveButton.setAttribute('class', 'save');
  newTableSaveButton.setAttribute('id', `${folderId}-save-btn`);
  newTableSaveButton.setAttribute('onclick', `saveNote(${folderId})`);
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

  document.getElementById(`table-name-${folderId}`).focus();

  const addBtn = document.getElementById('add-note-btn');
  addBtn.setAttribute('onclick', 'deactivateAddBtn()');
};

const deactivateAddBtn = () => {
  alert('?????? ????????? ??????????????????.');
};

const saveNote = async (folderId) => {
  const newNameElement = document.getElementById(`table-name-${folderId}`);
  const newCommentElement = document.getElementById(
    `table-comment-${folderId}`
  );
  const newWebsiteElement = document.getElementById(
    `table-website-${folderId}`
  );
  const newTagElement = document.getElementById(`table-tag-${folderId}`);
  const reg_URL =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  if (newNameElement.value === '') {
    alert('?????? ????????? ????????? ??????????????????.');
  } else if (reg_URL.test(newWebsiteElement.value)) {
    let data = new FormData();
    data.append('noteName', newNameElement.value);
    data.append('noteComment', newCommentElement.value);
    data.append('noteLink', newWebsiteElement.value);
    data.append('tag', newTagElement.value);
    try {
      await axios.post(`/dashboard/${folderId}/createnote/`, data);

      window.location.reload();
    } catch (e) {
      alert('????????? URL??? ??????????????????.');
    }
  } else {
    alert('????????? URL??? ??????????????????.');
  }
};
