const fs = require("fs").promises;
const path = require("path");

const tsconfig = require("../tsconfig.json");

const out = path.resolve(__dirname, "..", tsconfig.compilerOptions.outDir);

const start = async () => {
    await fs.rm(out, {
        recursive: true,
        force: true
    }).catch(() => { });
}

start();