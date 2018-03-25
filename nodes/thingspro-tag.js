var protobuf = require("protobufjs");

module.exports = function (RED) {
  var TagMessage;

  function Tag(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function (msg) {
      var message = TagMessage.decode(msg.payload);
      var object = TagMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
      });
  
      msg.payload = object;
      node.send(msg);
    });
  }

  protobuf.load(__dirname + "/thingspro-tag.proto", function (err, root) {
    if (err) throw err;
    TagMessage = root.lookupType("mxtag.pb.Tag");
    RED.nodes.registerType("thingspro-tag", Tag);
  });
}