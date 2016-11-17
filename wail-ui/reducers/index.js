import {combineReducers} from 'redux-immutable'
import collections from './collectionReducer'
import crawls from './crawls'
import {reducer as form, actionTypes} from 'redux-form/immutable'
import {filterActions} from 'redux-ignore'
import {CollectionEvents, CrawlEvents, CheckUrlEvents,} from '../constants/wail-constants'
import checkUrl from './checkUrl'
import {reducer as notifications} from 'react-notification-system-redux'
import {batchActions, enableBatching} from 'redux-batched-actions'

// const rootReducer = combineReducers({ collections, crawls, form })
const rootReducer = enableBatching(combineReducers({
  collections: filterActions(collections, Object.values(CollectionEvents)),
  crawls: filterActions(crawls, Object.values(CrawlEvents)),
  form: filterActions(form, Object.values(actionTypes)),
  checkUrl: filterActions(checkUrl, Object.values(CheckUrlEvents))
}))
export default rootReducer

