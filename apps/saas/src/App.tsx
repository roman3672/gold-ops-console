import type { ReactElement } from 'react';
import { sdkVersion } from '@gold-ops/sdk';

export function App(): ReactElement {
  return (
    <main>
      <h1>Gold Workspace</h1>
      <p>Product surface (sdk {sdkVersion()})</p>
    </main>
  );
}
