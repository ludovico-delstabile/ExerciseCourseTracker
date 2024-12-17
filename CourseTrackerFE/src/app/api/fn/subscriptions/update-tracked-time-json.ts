/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SubscriptionDto } from '../../models/subscription-dto';

export interface UpdateTrackedTime$Json$Params {
  subscriptionId: number;
      body?: number
}

export function updateTrackedTime$Json(http: HttpClient, rootUrl: string, params: UpdateTrackedTime$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
  const rb = new RequestBuilder(rootUrl, updateTrackedTime$Json.PATH, 'patch');
  if (params) {
    rb.path('subscriptionId', params.subscriptionId, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SubscriptionDto>;
    })
  );
}

updateTrackedTime$Json.PATH = '/api/Subscriptions/{subscriptionId}/UpdateTrackedTime';
