import { EventStatistics } from './event-statistics.model';

export class SubscriptionData {
  eventId: number;
  eventName: string;
  subscriptionStart: Date;
  subscriptionEnd: Date;
  eventStatistics: EventStatistics;
}
