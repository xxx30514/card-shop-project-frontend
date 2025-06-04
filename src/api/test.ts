import { api } from 'src/api/axios';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// ✅ 取得使用者資料
export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await api.get('/user/info');
  return res.data;
};

// ✅ 更新使用者名稱
export const updateUserName = async (name: string): Promise<UserInfo> => {
  const res = await api.put('/user/update', { name });
  return res.data;
};

// ✅ 登出
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};
