import { DefaultBodyType, HttpResponse, StrictRequest } from 'msw';

export async function isAuthenticated(request: StrictRequest<DefaultBodyType>) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken) {
    throw new HttpResponse(null, { status: 401 });
  }
}
