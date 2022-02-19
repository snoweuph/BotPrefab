import fs from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
const dir = 'build';

fs.rm(dir, { recursive: true, force: true }, (err) => {
    if (err) {
        throw err;
    }
    //run tsc
    exec('tsc', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        } else {
            copyfiles('', 'src', dir);
        }
    });
});

function copyfiles(path: string, origin: string, target: string) {
    fs.readdir(join(origin, path), (err, files) => {
        if (err) {
            throw err;
        }
        for (const file in files) {
            //test if file is a directory, if it is create dir if not existent, then recurse
            if (fs.lstatSync(join(origin, path, files[file])).isDirectory()) {
                if (!fs.existsSync(join(target, path, files[file]))) {
                    fs.mkdirSync(join(target, path, files[file]));
                }
                copyfiles(join(path, files[file]), origin, target);
            }
            else {
                if (files[file].endsWith('.ts')) continue;
                fs.copyFile(join(origin, path, files[file]), join(target, path, files[file]), (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
    });
}