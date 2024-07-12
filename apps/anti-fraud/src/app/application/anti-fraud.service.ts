import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AntiFraudService {
  // is fraud when value is greater than 1000
  validateTransaction(transaction: number): Observable<boolean> {
    const isFraud = transaction > 1000;
    return of(isFraud);
  }
}
