export default function isUsernameValid(username: string) {
  const regex = /^[a-zA-Z0-9]{5,}$/;
  return regex.test(username);
}
