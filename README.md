支持**微信公众号**支付和**微信小程序**支付

安装方法
```sh
npm install wxpay-simple-js
```

使用方法
```javascript
import wxPaySimple from 'wxpay-simple-js'
/**
	charge格式要求:
	{
		channel: "wx_lite",//wx_lite微信小程序，wx_pub微信公众号
		credential: {
			"wx_lite": {//这里的key要和channel的value对应
				"appId": "*",
				"timeStamp": "*",
				"nonceStr": "*",
				"package": "*",
				"signType": "*",
				"paySign": "*",
			}
		}
	}
**/
wxPaySimple.createPayment(charge, (result, err)=>{
	if (result == "success") {
		// 只有微信公众账号 (wx_pub)、微信小程序 (wx_lite)
	} else if (result == "fail") {
		//不正确或者微信公众账号/微信小程序支付失败时会在此处返回
	} else if (result == "cancel") {
		// 微信公众账号、微信小程序支付取消支付
	}
}
```


