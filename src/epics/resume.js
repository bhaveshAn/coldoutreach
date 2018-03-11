import { ActionsObservable, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';

// rxjs
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import * as Actions from '../actions';
import { history } from '../store';


const uploadResumeEpic = (action$) =>
  action$
    .ofType(Actions.UPLOAD_RESUME)
    .switchMap((action) => {
      return ajax.post(`/profile`, action.payload)
        .map((data) => {
          history.push('/email/');
          return Actions.UploadResumeSuccess(data.response)
        })
        .catch((error) => ActionsObservable.of(Actions.Error(error)));
    });


export const epics = combineEpics(
  uploadResumeEpic,
);
