export function createMockApi<T>(value: T, time = 500): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
}
export const mockCardInfoApi = () =>
  createMockApi(
    {
      name: 'Mark Henry',
      number: '564734112413200201',
      validThrough: '11/27',
      cvv: '476',
    },
    3000,
  );
