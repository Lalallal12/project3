//const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
//const sqs = new SQSClient();
const axios = require('axios').default

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const consumer = async (event) => {
  //await delay(15000)
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);
	const msg = JSON.parse(record.body);
    console.log("필요데이터: ", msg);
    console.log("물건아이디: ", msg.MessageAttributes.MessageAttributeProductId.Value);
    console.log("공장아이디: ", msg.MessageAttributes.MessageAttributeFactoryId.Value);
	
	const payload = {
      // TODO:
      // 어떤 형식으로 넣어야 할까요? Factory API 문서를 참고하세요.
      // 필요하다면 record.body를 활용하세요.
	  
        MessageGroupId : "stock-arrival-group", //"stock-arrival-group"
        MessageAttributeProductId : msg.MessageAttributes.MessageAttributeProductId.Value,
        MessageAttributeProductCnt : "3",
        MessageAttributeFactoryId : msg.MessageAttributes.MessageAttributeFactoryId.Value,
        MessageAttributeRequester : "곽원미",
        CallbackUrl : "https://0wkn2gr0b2.execute-api.ap-northeast-2.amazonaws.com/checkin"
      
    }
    
     axios.post('http://project3-factory.coz-devops.click/api/manufactures', payload)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
};

module.exports = {
  consumer,
};
