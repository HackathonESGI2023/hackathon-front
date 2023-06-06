import { AuthLoginDto } from '@schemas/auth.schema';
import { POST } from '../route';

export async function loginUser(userData: AuthLoginDto) {
  const res = await POST('http://localhost:3000/auth/login', {
    body: JSON.stringify(userData),
  });

  return res.json();
}
