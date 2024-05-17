import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import packageJson from './package.json';
import { TrierCloudMenuBuilder } from '@triercloud/menu';
import { trierCloudMenu } from './resources/menu/menu';

const { name: project, version, clientId } = packageJson;
const versionDate = new Date();
const healthData = JSON.stringify({
  status: 'UP',
  details: {
    domain: project.split('-')[0],
    service: project.split('-')[1],
    version,
    versionDate,
  },
});

const menu = {
  clientId: '@@CLIENT_ID@@',
  menu: TrierCloudMenuBuilder.getProjectMenu(trierCloudMenu, clientId),
  baseUrl: project,
};

function copyFileIfExists(orig: string, dest: string) {
  if (fs.existsSync(orig)) {
    fs.copyFileSync(orig, dest);
  }
}

function writeFile(dest: string, content: string) {
  const dirname = path.dirname(path.normalize(dest));

  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(dest, content);
}

function replaceVersionTagsInFile(file: string) {
  if (fs.existsSync(file)) {
    const oldContent = fs.readFileSync(file, 'utf-8').toString();
    let content = oldContent;
    content = content.replace(new RegExp('{HEALTH_DATA}', 'g'), healthData);
    content = content.replace(new RegExp('{PROJECT_NAME}', 'g'), project);
    content = content.replace(new RegExp('{PROJECT_CLIENT_ID}', 'g'), clientId);
    if (oldContent !== content) {
      writeFile(file, content);
    }
  }
}

function updateNgswConfigVersion() {
  const ngswConfigPath = path.resolve(__dirname, 'ngsw-config.json');
  if (fs.existsSync(ngswConfigPath)) {
    const ngswConfig = JSON.parse(fs.readFileSync(ngswConfigPath).toString());
    if (
      !ngswConfig?.navigationUrls ||
      !ngswConfig?.appData ||
      ngswConfig.appData.name !== project ||
      ngswConfig.appData.version !== version
    ) {
      if (!ngswConfig.navigationUrls) {
        ngswConfig.navigationUrls = [`/**`, `!/**/*.*`, `!/**/*__*`, `!/**/*__*/**`];
      }
      ngswConfig.appData = ngswConfig.appData ?? {};
      ngswConfig.appData.name = project;
      ngswConfig.appData.version = version;
      fs.writeFileSync(ngswConfigPath, JSON.stringify(ngswConfig, null, 2));
    }
  }
}

updateNgswConfigVersion();
execSync(`npx ng build --base-href=/${project}/`, { stdio: 'inherit' }); // NOSONAR

copyFileIfExists(`Dockerfile`, `dist/${project}/Dockerfile`);
copyFileIfExists(`nginx.conf`, `dist/${project}/nginx.conf`);
copyFileIfExists(`robots.txt`, `dist/${project}/robots.txt`);
['90-set-environment.sh', '91-registrar-menu.sh', 'recalculate-ngsw-hash.js'].forEach((script) =>
  copyFileIfExists(`resources/scripts/${script}`, `dist/${project}/${script}`)
);

writeFile(`dist/${project}/assets/menu.json`, JSON.stringify(menu, null, 2));
replaceVersionTagsInFile(`dist/${project}/Dockerfile`);
replaceVersionTagsInFile(`dist/${project}/nginx.conf`);
replaceVersionTagsInFile(`dist/${project}/91-registrar-menu.sh`);
replaceVersionTagsInFile(`dist/${project}/90-set-environment.sh`);
replaceVersionTagsInFile(`dist/${project}/recalculate-ngsw-hash.js`);
