import { ServiceBroker } from "moleculer";

export const broker = new ServiceBroker({
  nodeID: "gateway",
  transporter: "nats://nats-server:4222"
});

broker.start()
    .then(() => console.log("Broker started"));
