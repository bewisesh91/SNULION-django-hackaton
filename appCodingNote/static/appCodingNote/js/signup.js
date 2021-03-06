// console.log("signup연결");
/*아이디, 이메일, 비밀번호 정보 받기*/
let usernameCheckResult;
const getUsername = (tabName) => {
  return document.querySelector(`input[name=${tabName}-username]`).value;
};
const getEmail = (tabName) => {
  let email='';
  email = document.querySelector(`input[name=${tabName}-email]`).value;
  return email;
};
const getPasswords = (tabName) => {
  let passwords = [];
  const password1 = document.querySelector(`input[name=${tabName}-password1]`).value;
  const password2 = document.querySelector(`input[name=${tabName}-password2]`).value;
  passwords.push(password1);
  passwords.push(password2);
  return passwords;
};

/*회원가입 검증*/
const handleSignup = async (e) => {
  username = getUsername('signup');
  email = getEmail('signup');
  passwords = getPasswords('signup');
  usernameCheckResult = await validateUsername(username);
  if (
    usernameCheckResult &&
    validateEmail(email) &&
    validatePassword(passwords)
  ) {
    // console.log("Valid Signup form!");
    submitTarget('signup');
  } else {
    // console.log("Invalid Signup form!");
    dismissSignup();
  }
};

/*회원가입 submit 보내기*/
const submitTarget = (tabName) => {
  document.getElementById(`${tabName}-form`).submit();
};

/*회원가입 block*/
const dismissSignup = () => {
  showErrorNotice();
};

const showErrorNotice = async () => {
  const checkResult = await validateUsername(username);
  const errorNotice = document.getElementById('signup-error-notice');
  if (!checkResult) {
    errorNotice.innerHTML = '&#128557 아이디를 다시 확인해주세요';
  } else if (!validateEmail(email)) {
    errorNotice.innerHTML = '&#128557 형식에 맞춰 이메일을 입력해주세요.';
  } else if (!isValidFormatPassword(passwords)) {
    errorNotice.innerHTML =
      '&#128557 숫자, 특수문자를 포함한 6글자 이상의 비밀번호를 입력해주세요.';
  } else if (!isSamePasswords(passwords)) {
    errorNotice.innerHTML = '&#128557 비밀번호가 일치하지 않습니다.';
  }
};

/*아이디 유효성 실시간 검증*/
const signupUsername = document.getElementById('username');
const prevalidateUsername = async () => {
  const usernameCheckNotice = document.getElementById('signup-username-notice');
  username = getUsername('signup');
  const isFilledUsername = (username) => {
    const reg_username = /^[A-Za-z]{3,}$/;
    return reg_username.test(username);
  };
  const usernameCheckResult = await validateUsername(username);
  if (usernameCheckResult) {
    // console.log(validateUsername(username));
    usernameCheckNotice.innerHTML = '&#128522 사용가능한 아이디입니다.';
  } else if (isFilledUsername(username)) {
    usernameCheckNotice.innerHTML = '&#128533 중복된 아이디입니다.';
  } else if (username !== '') {
    usernameCheckNotice.innerHTML =
      '&#128527 영문으로만 구성된 3글자 이상의 아이디를 적어주세요.';
  } else {
    usernameCheckNotice.innerHTML = '';
  }
};

/*아이디 유효성 최종 검증*/
const validateUsername = async (username) => {
  const isFilledUsername = (username) => {
    const reg_username = /^[A-Za-z]{3,}$/;
    return reg_username.test(username);
  };
  let data = new FormData();
  data.append('username', username);
  const response = await axios.post('/accounts/checkusername/', data);
  // console.log(isFilledUsername(username));
  // console.log(response.data.result);
  // console.log(isFilledUsername(username) && response.data.result)
  return isFilledUsername(username) && response.data.result;
};

/*이메일 유효성 검증*/
const validateEmail = (email) => {
  const reg_email =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return reg_email.test(email);
};

/*비밀번호 유효성 검증*/
const isSamePasswords = ([pw1, pw2]) => {
  return pw1 === pw2;
};

const isValidFormatPassword = ([pw]) => {
  // console.log(pw);
  const regExp = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
  return regExp.test(pw);
};

const validatePassword = (passwords) => {
  return isSamePasswords(passwords) && isValidFormatPassword(passwords);
};

/*로그인 하기*/
/*아이디, 비밀번호 정보 받기*/
const getSigninUsername = () => {
  return document.querySelector('input[name=signin-username]').value;
};
const getSigninPassword = () => {
  return document.querySelector('input[name=signin-password]').value;
};

/*로그인 검증 함수 호출*/
const handleSignin = async (e) => { 
  console.log('js 연결');
  signinUsername = getSigninUsername();
  signinPassword = getSigninPassword();
  let data = new FormData();
  data.append('signin-username', signinUsername);
  data.append('signin-password', signinPassword);
  const response = await axios.post('/accounts/checksignin/', data);
  console.log(response.data.result);
  if (response.data.result) {
    console.log("Valid Signin form!");
    submitTarget('signin');
  } else {
    // console.log("Invalid Signin form!");
    dismissSignIn();
  }
};

const dismissSignIn = () => {
  const signinErrorNotice = document.getElementById('signin-error-notice');
  signinErrorNotice.innerHTML = '&#128557 아이디/비밀번호가 올바르지 않습니다.';
};

/*비밀번호 변경 - 유저 validation*/

const handleFindpw= async(e) => {
  checkEmail = getEmail('findpw');
  checkUsername = getUsername('findpw');
  let data = new FormData();
  data.append('findpw-email', checkEmail);
  data.append('findpw-username', checkUsername);
  const response = await axios.post('/accounts/findpw/',data);
  console.log(response.data.result);
  if(response.data.result){
    document.getElementById('forgotpw-section').classList.add('no-display');
    document.getElementById('resetpw-section').classList.remove('no-display');
  }
  else{
    alert("이메일 혹은 아이디가 유효하지 않습니다.");
  }
}

const getCheckEmail=()=>{
  return document.querySelector('input[name=check-email]').value;
}

/*비밀번호 변경 - new pw 입력*/
const handleResetpw = async (e) => {
  checkEmail = getEmail('findpw');
  checkUsername = getUsername('findpw');
  passwords = getPasswords('resetpw');
  errorNotice = document.getElementById('resetpw-error-notice');
  if(validatePassword(passwords)){
    let data = new FormData();
    data.append('findpw-email',checkEmail);
    data.append('findpw-username',checkUsername);
    data.append('resetpw-password',passwords[0]);
    const response = await axios.post('/accounts/resetpw/',data);
      if(response.data.result){
        document.getElementById('resetpw-section').classList.add('no-display');
        document.getElementById('signin-section').classList.remove('no-display');
        alert('비밀번호가 변경되었습니다.');
      }
  }
  else if (!isValidFormatPassword(passwords)) {
    errorNotice.innerHTML =
      '&#128557 숫자, 특수문자를 포함한 6글자 이상의 비밀번호를 입력해주세요.';
  } else if (!isSamePasswords(passwords)) {
    errorNotice.innerHTML = '&#128557 비밀번호가 일치하지 않습니다.';
  }
}