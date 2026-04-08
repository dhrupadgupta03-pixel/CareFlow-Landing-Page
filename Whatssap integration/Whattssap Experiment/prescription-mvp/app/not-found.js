/**
 * Global 404 page.
 * Rendered when notFound() is called or a route doesn't exist.
 */

import NotFoundView from '../patient/NotFoundView.jsx';

export default function NotFound() {
  return <NotFoundView />;
}
