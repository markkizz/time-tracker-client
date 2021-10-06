export function clearToken() {
  localStorage.removeItem('token')
  window.location.href = '/'
}