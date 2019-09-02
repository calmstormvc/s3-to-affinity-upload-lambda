'use strict';

const AWS = require('aws-sdk');
AWS.config.apiVersions = {
  s3: '2006-03-01',
};
const S3 = new AWS.S3();
const request = require('sync-request');
const util = require('./lib/util.js');

module.exports.upload_attachment = async (events, context) => {

  const event = events.Records[0];
  const { bucket: { name: bucket }, object: { key: objectKey } } = event.s3;
  const fileName = decodeURIComponent(objectKey.replace(/\+/g, ' '));

  const { Body: fileBuffer } = await S3.getObject({
    Bucket: bucket,
    Key: fileName
  }).promise();

  const fileInfo = util.parseFileInfo(objectKey);
  const uploadReq = util.uploadFile(fileBuffer, fileInfo.fileName, fileInfo.orgId, process.env.AFFINITY_API_KEY);
  const res = request('POST', `${process.env.AFFINITY_API_URL}/entity-files`, uploadReq);

  console.log("AFFINITY API RESPONSE:\n" + JSON.stringify(res, null, 2));

  return { message: `Processed file ${objectKey}`, event, res };
};

