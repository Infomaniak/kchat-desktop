/* eslint-disable header/header */
const {execSync} = require('child_process');

exports.default = async (config) => {
    // Common
    const filePath = `${config.path}`;
    const smctlDir = 'C:\\Program Files\\DigiCert\\DigiCert One Signing Manager Tools'; //`"${process.env.SM_INSTALL_DIR}"`;
    const signToolDir = 'C:\\Program Files (x86)\\Windows Kits\\10\\App Certification Kit'; //`"${process.env.SIGNTOOL_DIR}"`;

    try {
        const signCommand = '.\\scripts\\sign.ps1';
        const keyPairAlias = `${process.env.SM_KEYPAIR_ALIAS}`;
        const sign = [
            'powershell',
            '-NoProfile',
            '-ExecutionPolicy Unrestricted',
            `-Command "${signCommand}`,
            `-FilePath '${filePath}'`,
            `-KeyPairAlias '${keyPairAlias}'`,
            `-SmctlDir '${smctlDir}'`,
            `-SignToolDir '${signToolDir}'"`,
        ];
        const signStdout = execSync(sign.join(' '), {shell: 'powershell.exe'}).toString();
        console.log(`${signStdout}`);
        if (signStdout.match(/FAILED/)) {
            console.error(
                `Error detected in ${signCommand}: [${signStdout}]`,
            );
            throw new Error(`Error detected in ${signCommand}: [${signStdout}]`);
        }
    } catch (e) {
        throw new Error(`Exception thrown during code signing: ${e.message}`);
    }

    // Verify the signature
    try {
        const verifyCommand = '.\\scripts\\verify.ps1';
        const fingerprint = `${process.env.SM_CODE_SIGNING_CERT_SHA1_HASH}`;
        const verify = [
            'powershell',
            '-NoProfile',
            '-ExecutionPolicy Unrestricted',
            `-Command ${verifyCommand}`,
            `-FilePath '${filePath}'`,
            `-Fingerprint '${fingerprint}'`,
            `-SmctlDir '${smctlDir}'`,
            `-SignToolDir '${signToolDir}'"`,
        ];
        const verifyStdout = execSync(verify.join(' ')).toString();
        if (verifyStdout.match(/FAILED/)) {
            console.error(
                `Error detected in ${verifyCommand}: [${verifyStdout}]`,
            );
            throw new Error(`Error detected in ${verifyCommand}: [${verifyStdout}]`);
        }
    } catch (e) {
        throw new Error(`Exception thrown during signature verification: ${e.message}`);
    }
};
