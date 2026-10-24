import { handleChantGroupRequest } from '../../_lib/chantGroups';

type ChantGroupContext = {
  request: Request;
  env: {
    AUM_TURSO_URL?: string;
    AUM_TURSO_TOKEN?: string;
  };
};

export async function onRequest(context: ChantGroupContext): Promise<Response> {
  const url = context.env.AUM_TURSO_URL || '';
  const token = context.env.AUM_TURSO_TOKEN || '';
  return handleChantGroupRequest(context.request, url && token ? { url, token } : null);
}
