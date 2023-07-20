import { vi } from 'vitest'

// mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// implementation of window.resizeTo for dispatching event
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'))
}

// export const mockedNavigator = vi.fn(() => (path: string) => path);
// export const mockedLocation = vi.fn(() => ({ pathname: '/login' }));
// export const mockedRouteData = vi.fn();
// export const mockedCreateResource = vi.fn(() => [
//   () => ({
//     id: 1,
//   }),
//   { refetch: () => {} },
// ]);
// export const mockedParams = vi.fn();

// vi.mock('@solidjs/router', async () => {
//   const actual = await vi.importActual<typeof router>('@solidjs/router');

//   return {
//     ...actual,
//     useNavigate: mockedNavigator,
//     useLocation: mockedLocation,
//     useRouteData: mockedRouteData,
//     useParams: mockedParams,
//   };
// });
