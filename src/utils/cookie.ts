export const setCookie = (name: string, value: string, expireDate: Date) => {
  document.cookie = `${name}=${value}; expires=${expireDate.toUTCString()}; path=/`;
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

// 오늘 자정(밤 12시) 만료 시간을 계산하는 함수
export const getMidnightExpiration = () => {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return midnight;
};
