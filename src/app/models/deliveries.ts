export class DeliveriesInterface{
  name: string;
  picture: string;
  idSender:any;
  message:{
    subject: string;
    sender: any;
    body: any;
  };
  createdAt: Date;
  readAt: Date;
}
