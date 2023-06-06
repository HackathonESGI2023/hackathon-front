import { AuthRegisterDto } from '@zod/auth/auth.schema';
import { POST } from '../route';

export async function registerUser(userData: AuthRegisterDto) {
  const res = await POST('http://localhost:3000/auth/register/', {
    body: JSON.stringify(userData),
  });

  return res.json();
}
