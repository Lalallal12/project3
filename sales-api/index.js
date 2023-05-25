//const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
//const sqs = new SQSClient();

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const consumer = async (event) => {
  //await delay(15000)
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);
	const msg = JSON.parse(record.body).MessageAttributes;
    console.log("필요데이터: ", msg);
    console.log("물건아이디: ", msg.MessageAttributeProductId.Value);
    console.log("공장아이디: ", msg.MessageAttributeFactoryId.Value);

  }
};

module.exports = {
  consumer,
};
