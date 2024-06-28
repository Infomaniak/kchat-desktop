/* eslint-disable header/header */
const {execSync} = require('child_process');

exports.default = async (config) => {
    const keypairAlias = process.env.SM_KEYPAIR_ALIAS;
    const path = config.path ? String(config.path) : '';

    if (!keypairAlias || !path) {
        throw new Error('Signing failed: missing vars');
    }

    const output = execSync(
        `smctl sign --keypair-alias=${keypairAlias} --input="${path}" --verbose`,
    ).
        toString().
        trim();

    if (!output.includes('Done Adding Additional Store')) {
        throw new Error(`Failed to sign executable: ${output}`);
    }
};
