/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getSubscriptions$Json } from '../fn/subscriptions/get-subscriptions-json';
import { GetSubscriptions$Json$Params } from '../fn/subscriptions/get-subscriptions-json';
import { getSubscriptions$Plain } from '../fn/subscriptions/get-subscriptions-plain';
import { GetSubscriptions$Plain$Params } from '../fn/subscriptions/get-subscriptions-plain';
import { subscribeCourse$Json } from '../fn/subscriptions/subscribe-course-json';
import { SubscribeCourse$Json$Params } from '../fn/subscriptions/subscribe-course-json';
import { subscribeCourse$Plain } from '../fn/subscriptions/subscribe-course-plain';
import { SubscribeCourse$Plain$Params } from '../fn/subscriptions/subscribe-course-plain';
import { SubscriptionDto } from '../models/subscription-dto';
import { unsubscribeCourse } from '../fn/subscriptions/unsubscribe-course';
import { UnsubscribeCourse$Params } from '../fn/subscriptions/unsubscribe-course';
import { updateTrackedTime$Json } from '../fn/subscriptions/update-tracked-time-json';
import { UpdateTrackedTime$Json$Params } from '../fn/subscriptions/update-tracked-time-json';
import { updateTrackedTime$Plain } from '../fn/subscriptions/update-tracked-time-plain';
import { UpdateTrackedTime$Plain$Params } from '../fn/subscriptions/update-tracked-time-plain';

@Injectable({ providedIn: 'root' })
export class SubscriptionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getSubscriptions()` */
  static readonly GetSubscriptionsPath = '/api/Subscriptions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriptions$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptions$Plain$Response(params?: GetSubscriptions$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SubscriptionDto>>> {
    return getSubscriptions$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSubscriptions$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptions$Plain(params?: GetSubscriptions$Plain$Params, context?: HttpContext): Observable<Array<SubscriptionDto>> {
    return this.getSubscriptions$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SubscriptionDto>>): Array<SubscriptionDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubscriptions$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptions$Json$Response(params?: GetSubscriptions$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SubscriptionDto>>> {
    return getSubscriptions$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSubscriptions$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubscriptions$Json(params?: GetSubscriptions$Json$Params, context?: HttpContext): Observable<Array<SubscriptionDto>> {
    return this.getSubscriptions$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SubscriptionDto>>): Array<SubscriptionDto> => r.body)
    );
  }

  /** Path part for operation `subscribeCourse()` */
  static readonly SubscribeCoursePath = '/api/Subscriptions/Subscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribeCourse$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  subscribeCourse$Plain$Response(params?: SubscribeCourse$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
    return subscribeCourse$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `subscribeCourse$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  subscribeCourse$Plain(params?: SubscribeCourse$Plain$Params, context?: HttpContext): Observable<SubscriptionDto> {
    return this.subscribeCourse$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<SubscriptionDto>): SubscriptionDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribeCourse$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  subscribeCourse$Json$Response(params?: SubscribeCourse$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
    return subscribeCourse$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `subscribeCourse$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  subscribeCourse$Json(params?: SubscribeCourse$Json$Params, context?: HttpContext): Observable<SubscriptionDto> {
    return this.subscribeCourse$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<SubscriptionDto>): SubscriptionDto => r.body)
    );
  }

  /** Path part for operation `unsubscribeCourse()` */
  static readonly UnsubscribeCoursePath = '/api/Subscriptions/{subscriptionId}/Unsubscribe';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unsubscribeCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  unsubscribeCourse$Response(params: UnsubscribeCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return unsubscribeCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unsubscribeCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unsubscribeCourse(params: UnsubscribeCourse$Params, context?: HttpContext): Observable<void> {
    return this.unsubscribeCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateTrackedTime()` */
  static readonly UpdateTrackedTimePath = '/api/Subscriptions/{subscriptionId}/UpdateTrackedTime';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrackedTime$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateTrackedTime$Plain$Response(params: UpdateTrackedTime$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
    return updateTrackedTime$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTrackedTime$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateTrackedTime$Plain(params: UpdateTrackedTime$Plain$Params, context?: HttpContext): Observable<SubscriptionDto> {
    return this.updateTrackedTime$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<SubscriptionDto>): SubscriptionDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrackedTime$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateTrackedTime$Json$Response(params: UpdateTrackedTime$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<SubscriptionDto>> {
    return updateTrackedTime$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTrackedTime$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateTrackedTime$Json(params: UpdateTrackedTime$Json$Params, context?: HttpContext): Observable<SubscriptionDto> {
    return this.updateTrackedTime$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<SubscriptionDto>): SubscriptionDto => r.body)
    );
  }

}
