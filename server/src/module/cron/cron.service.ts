import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LotModel } from 'src/models/lot.model';
import { NotificationGateway } from '../notification/notification.gateway';
import { PaymentService } from '../payment/payment.service';
import { buildRelistedDate } from '../lot/time.utils';

@Injectable()
export class CronSerivce {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly notificationGateWay: NotificationGateway,
  ) {}

  @Cron('*/1 * * * *')
  async checkLot() {
    try {
      const nowDate = new Date();

      const soldThreshold = new Date(
        nowDate.getTime() - 14 * 24 * 60 * 60 * 1000,
      );

      const archiveThreshold = new Date(
        nowDate.getTime() - 90 * 24 * 60 * 60 * 1000,
      );

      await LotModel.updateMany(
        {
          status: 'Sold',
          date: { $lte: soldThreshold },
        },
        {
          $set: { status: 'Archive' },
        },
      );

      await LotModel.deleteMany({
        status: 'Archive',
        updatedAt: { $lte: archiveThreshold },
      });

      const expiredLots = await LotModel.find({
        date: { $lte: nowDate },
        status: 'Active',
      });

      if (expiredLots.length === 0) return;

      for (const lot of expiredLots) {
        try {
          if (lot.historyBid.length > 0) {
            const winner = lot.historyBid[lot.historyBid.length - 1];

            await this.paymentService.buyLot(
              winner.author.toString(),
              {
                lotId: lot._id.toString(),
                price: winner.currentBid,
              },
            );
          } else {
            const now = new Date();
            const durationMs = lot.auctionDurationMs;

            if (
              typeof durationMs !== 'number' ||
              !Number.isFinite(durationMs) ||
              durationMs <= 0
            ) {
              console.error('Некорректная длительность лота', lot._id);
              continue;
            }

            if (lot.autoReExtension) {
                console.log({
                now: nowDate.toISOString(),
                oldDate: lot.date.toISOString(),
                durationMs: lot.auctionDurationMs,
                durationHours: (lot.auctionDurationMs ?? 0) / 3_600_000,
            });
              const nextDate = buildRelistedDate(now, durationMs);

            console.log('ДО ОБНОВЛЕНИЯ:', {
  now: now.toISOString(),
  oldDate: lot.date.toISOString(),
  durationMs,
  durationHours: durationMs / 3_600_000,
  nextDate: nextDate.toISOString(),
  nextDateKyiv: nextDate.toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
  }),
});

              const updatedLot = await LotModel.findOneAndUpdate(
                {
                    _id: lot._id,
                    status: 'Active',
                    'historyBid.0': { $exists: false },
                },
                {
                    $set: {
                    date: nextDate,
                    auctionDurationMs: durationMs,
                    },
                },
                { returnDocument: 'after' },
                );
                if(!updatedLot) {
                    console.log('Лот НЕ обновлён. Возможно, не совпали условия запроса.');
                    continue;
                }
                const check = await LotModel.findById(lot._id).select('date');

console.log('ПОВТОРНО ИЗ БАЗЫ:', {
  date: check?.date,
  iso: check?.date?.toISOString(),
});
                console.log('ПОСЛЕ ОБНОВЛЕНИЯ:', {
  savedDate: updatedLot?.date?.toISOString(),
  savedDateKyiv: updatedLot?.date?.toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
  }),
});

console.log({
  id: check?._id.toString(),
  date: check?.date,
  database: LotModel.db.name,
  collection: LotModel.collection.name,
});
              console.log('Лот перевыставлен');
            } else {
              const update = await LotModel.updateOne(
                {
                  _id: lot._id,
                  status: 'Active',
                  date: { $lte: now },
                  'historyBid.0': { $exists: false },
                },
                {
                  $set: {
                    status: 'Completed',
                    auctionDurationMs: durationMs,
                  },
                },
              );

              if (update.modifiedCount === 0) continue;

              console.log(`Лот ${lot._id} завершён без ставок`);
            }
          }

          if (lot.historyBid.length === 0 && lot.autoReExtension) {
            await this.notificationGateWay.sendNotification({
              to: lot.author.toString(),
              notification: 'lotRelisted',
              lotId: lot._id.toString(),
            });
          } else if (
            lot.historyBid.length === 0 &&
            !lot.autoReExtension
          ) {
            await this.notificationGateWay.sendNotification({
              to: lot.author.toString(),
              notification: 'lotNotRedeemed',
              lotId: lot._id.toString(),
            });
          }
        } catch (error) {
          console.error('CRON ошибка лота', lot._id, error);
        }
      }
    } catch (error) {
      throw error;
    }
  }
}