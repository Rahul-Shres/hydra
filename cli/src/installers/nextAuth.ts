import type { Installer, AvailableDependencies } from "~/installers/index.js";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const nextAuthInstaller: Installer = ({ projectDir }) => {
  const deps: AvailableDependencies[] = ["next-auth"];

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const nextAuthAssetDir = path.join(PKG_ROOT, "template/addons/next-auth");

  const apiHandlerSrc = path.join(nextAuthAssetDir, "api-handler.ts");
  const apiHandlerDest = path.join(
    projectDir,
    "src/pages/api/auth/[...nextauth].ts",
  );

  const getServerAuthSessionSrc = path.join(
    nextAuthAssetDir,
    "get-server-auth-session.ts",
  );
  const getServerAuthSessionDest = path.join(
    projectDir,
    "src/server/common/get-server-auth-session.ts",
  );

  const restrictedApiSrc = path.join(nextAuthAssetDir, "restricted.ts");
  const restrictedApiDest = path.join(
    projectDir,
    "src/pages/api/restricted.ts",
  );

  const nextAuthDefinitionSrc = path.join(nextAuthAssetDir, "next-auth.d.ts");
  const nextAuthDefinitionDest = path.join(
    projectDir,
    "src/types/next-auth.d.ts",
  );

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(getServerAuthSessionSrc, getServerAuthSessionDest);
  fs.copySync(restrictedApiSrc, restrictedApiDest);
  fs.copySync(nextAuthDefinitionSrc, nextAuthDefinitionDest);
};
