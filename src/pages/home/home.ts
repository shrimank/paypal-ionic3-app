import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
  currencies = ['EUR', 'USD'];
  	
  responsestr:any;

  constructor(private payPal:PayPal,public navCtrl: NavController) {
  }

  makePayment(){
    this.payPal.init({
      PayPalEnvironmentSandbox: 'Aa9fX8AICuvSuampImy5gLANRlWTqJ3RQZnLk6w0_h81cm6fMc2JYbpNaJpdfj9C2uVUTyqWXpSeyvgV',
      PayPalEnvironmentProduction: ''
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionayPal
        
      })).then(() => {
        //let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
          alert('Successfully Paid');
          this.responsestr=JSON.stringify(response,null,2);
          //Redirect  to success page
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          alert('Error or render dialog closed without being successful');
        });
      }, () => {
        alert('Error in configuration');
      });
    }, () => {
      alert('Error in initialization, maybe PayPal isn\'t supported or something else');
    });
  }

  

}
