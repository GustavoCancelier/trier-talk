/* eslint-disable @typescript-eslint/no-explicit-any */
import packageJson from '../../package.json';
const defaultUrl = `${window.location.protocol}//${window.location.host}`;
const orchestratorUrl = defaultUrl;
const apiUrl = `${defaultUrl}/api`.replace('//', '/').replace(':/', '://');

const clientIdKey = 'clientId';
let clientId = (window as { [key: string]: any })['env'][clientIdKey] as string;
if (!clientId) {
  clientId = packageJson.clientId;
  console.log(
    `ATENÇÃO: variável de ambiente '${clientIdKey}' sem valor definido, será assumido o valor padrão '${clientId}'.`
  );
}

export const defaultEnvironment = {
  apiUrl,
  orchestratorUrl,
  production: true,
  clientId,
  authorizeUrl: `${apiUrl}/oauth/authorize`,
  logoutUrl: `${apiUrl}/logout`,
  tokenUrl: `${apiUrl}/oauth/token`,
  callbackUrl: orchestratorUrl,
  basicAuth: 'dHJpZXJjbG91ZC13ZWI6',
};

export const isLocalEnv = () => window.location.host.startsWith('local.');
export const isDevEnv = () => window.location.host.startsWith('dev.');
export const isHomologEnv = () => window.location.host.startsWith('homolog.');
