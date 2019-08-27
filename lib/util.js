const FormData = require('sync-request').FormData;

module.exports.parseFileInfo = (fileName) => {
    const match = fileName.match(/^([0-9]+)_(.+)$/);
    return match && match[1] ? { orgId: parseInt(match[1]), fileName: match[2] } : null;
}

module.exports.uploadFile = (fileBuffer, fileName, orgId, key) => {
    const formData = new FormData()
    formData.append("file", fileBuffer, fileName);
    formData.append("organization_id", orgId)

    return {
      form: formData,
      headers: {
        "Authorization": `Basic ${Buffer.from(":" + key).toString("base64")}`
      }
    };
}

