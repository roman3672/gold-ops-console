import Fastify from 'fastify';
import { sdkVersion } from '@gold-ops/sdk';

const app = Fastify({ logger: true });

app.get('/health', async () => ({
  ok: true as const,
  sdk: sdkVersion(),
}));

const port = Number(process.env['PORT'] ?? 3000);
const host = process.env['HOST'] ?? '0.0.0.0';

try {
  await app.listen({ port, host });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
