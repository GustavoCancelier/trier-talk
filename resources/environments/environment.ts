/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultUrl = `${window.location.protocol}//${window.location.host}`;
const orchestratorUrl = defaultUrl;
const apiUrl = `${defaultUrl}/api`.replace('//', '/').replace(':/', '://');

export const defaultEnvironment = {
  apiUrl,
  orchestratorUrl,
  production: false,
  clientId: '',
  authorizeUrl: '',
  logoutUrl: '',
  tokenUrl: '',
  callbackUrl: orchestratorUrl,
  basicAuth: '',
  noAuthenticate: true,
  // customApiUrls: {
  //   '/cadastro/cliente': 'http://localhost:8081',
  //   '/cadastro/empresa': 'http://localhost:8083',
  //   '/cadastro/produto': 'http://localhost:8080',
  //   '/compra/entrada': 'http://localhost:8087',
  //   '/mercado/venda': 'http://localhost:8082',
  //   '/platform/security': 'http://localhost:9091',
  //   '/platform/config': 'http://localhost:9092',
  //   '/platform/menu': 'http://localhost:9093',
  //   '/platform/cep': 'http://localhost:9094',
  //   '/platform/perfil': 'http://localhost:9095',
  //   '/platform/saga': 'http://localhost:9096',
  // },
};
