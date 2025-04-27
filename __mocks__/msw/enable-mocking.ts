export async function enableMocking() {
  const { worker } = await import('./mock-worker');

  return worker.start();
}
