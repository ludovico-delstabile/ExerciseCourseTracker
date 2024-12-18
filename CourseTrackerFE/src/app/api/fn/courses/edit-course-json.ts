/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CourseDto } from '../../models/course-dto';

export interface EditCourse$Json$Params {
      body?: CourseDto
}

export function editCourse$Json(http: HttpClient, rootUrl: string, params?: EditCourse$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CourseDto>> {
  const rb = new RequestBuilder(rootUrl, editCourse$Json.PATH, 'patch');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CourseDto>;
    })
  );
}

editCourse$Json.PATH = '/api/Courses';
