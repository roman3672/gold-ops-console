import type { ReactElement } from 'react';
import { sdkVersion } from '@gold-ops/sdk';

export function App(): ReactElement {
  return (
    <main>
      <h1>Gold Ops Console</h1>
      <p>Internal operator surface (sdk {sdkVersion()})</p>
    </main>
  );
}
