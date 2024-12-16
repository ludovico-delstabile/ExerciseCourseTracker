/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SubscriptionDto } from '../../models/subscription-dto';

export interface UpdateTrackedTime$Plain$Params {
  subscriptionId?: number;
  subscriptionId: string;
      body?: number
}

export function updateTrackedTime$Plain(http: HttpClient, rootUrl: string, params: UpdateTrackedTime$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
  const rb = new RequestBuilder(rootUrl, updateTrackedTime$Plain.PATH, 'patch');
  if (params) {
    rb.query('subscriptionId', params.subscriptionId, {});
    rb.path('subscriptionId', params.subscriptionId, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SubscriptionDto>;
    })
  );
}

updateTrackedTime$Plain.PATH = '/api/Subscriptions/{subscriptionId}/UpdateTrackedTime';
