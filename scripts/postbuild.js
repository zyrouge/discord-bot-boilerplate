const fs = require("fs").promises;
const path = require("path");

const tsconfig = require("../tsconfig.json");
const ignoredExts = ["ts"];

const src = path.resolve(__dirname, "..", tsconfig.compilerOptions.rootDir);
const out = path.resolve(__dirname, "..", tsconfig.compilerOptions.outDir);

const handleFolder = async (dir) => {
    const files = await fs.readdir(dir);
    for (const fn of files) {
        const ndir = path.join(dir, fn);
        const lstat = await fs.lstat(ndir);
        if (lstat.isDirectory()) await handleFolder(ndir);
        else await handleFile(dir, fn);
    }
}

const handleFile = async (dir, fn) => {
    const ext = fn.split(".").pop();
    if (!ignoredExts.includes(ext)) {
        await fs.copyFile(path.join(dir, fn), path.join(out, fn));
    }
}

const start = async () => {
    await handleFolder(src);
}

start();