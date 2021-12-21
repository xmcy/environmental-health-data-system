const cp = require("child_process");

function runProcess(server, params) {
    if (!server) return;
    return cp.spawn(server, params || [], {
        shell: true,
        stdio: "inherit"
    });
}

function initCreate() {
    let name = process.argv[2];
    let filePath = process.argv[3];
    if (filePath) filePath = `./src/components/modules/${filePath}`;
    runProcess("mts create", [name, filePath]);
}

initCreate();
