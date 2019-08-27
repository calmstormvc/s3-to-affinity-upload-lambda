const handler = require("../handler.js")
const util = require("../lib/util.js")
const assert = require('assert');

describe("util", function() {
  describe("#parseFileInfo()", function() {
    it("should return the id when it's present", function() {
      assert.deepEqual(util.parseFileInfo("222340235_test_file.txt"), {orgId: 222340235, fileName: "test_file.txt"});
    });

    it("should return null when it's not present", function() {
      assert.equal(util.parseFileInfo("test_file.txt"), null);
    });

    it("should return null when file name is not present", function() {
      assert.equal(util.parseFileInfo("222340235_"), null);
    });
  });

  describe("#uploadFile()", function() {
    it("should create the request object", function() {
      const buffer = Buffer.alloc(5);
      assert.deepEqual(
      {
        "form": {
          "_entries": [
            {
              "fileName": "test.txt",
              "key": "file",
              "value": buffer
            },
            {
              "fileName": undefined,
              "key": "organization_id",
              "value": 12345
            }
          ]
        },
        "headers": {
          "Authorization": "Basic OjEyMzQ="
        }
      }, util.uploadFile(buffer, "test.txt", 12345, 1234))
    })
  });
});
