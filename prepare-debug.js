const fs = require("fs");
const debugSnippet = `
# Added automatically by prepare-debug.js on ${new Date()}
import os
import ptvsd
if os.environ.get('DEBUG','false').lower() == 'true':
    ptvsd.enable_attach(address=('0.0.0.0', 5890))
    print("Waiting for debugger attach on port 5890...")
    ptvsd.wait_for_attach()
    print("Debugger attached!")
`;
const fileName =
  "./node_modules/serverless-offline/src/lambda/handler-runner/python-runner/invoke.py";
const data = fs.readFileSync(fileName);
const fileContent = data.toString("utf-8", 0, data.length);

if (fileContent.includes("prepare-debug.js")) {
  console.log("Debugger snippet had already been added!");
  process.exit(0);
}

const fd = fs.openSync(fileName, "w+");
const insert = Buffer.from(debugSnippet);
fs.writeSync(fd, insert, 0, insert.length, 0);
fs.writeSync(fd, data, 0, data.length, insert.length);
fs.close(fd, (err) => {
  if (err) throw err;
});
console.log("Debugger snippet has been successfully added!");
