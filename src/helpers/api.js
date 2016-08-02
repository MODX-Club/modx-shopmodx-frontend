// https://visionmedia.github.io/superagent/

import xhr from 'superagent'
import Actions from 'actions/appServerActions'
import middlware from 'lib/requestMiddleware'
import env from 'const/env'
import join from 'lib/join';
import isFunction from 'lib/isFunction';
import requestAction from 'lib/runAction';

function handleError() {
  console.warn(arguments)
}

let parseXHRResponse = middlware.parseXHRResponse;
let {connectorsUrl, modxsiteConnectorsUrl, connector} = env;
let actions = Actions.prototype;

export class API {

  goodAddToCart(params) {
    xhr('post', join('', connectorsUrl, connector, '?action=products/add'))
      .type('form')
      .send(params.data)
      .on('error', handleError)
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didGoodAddToCart', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  goodRemoveFromCart(params) {
    let {data} = params;

    xhr('post', join('', connectorsUrl, connector, '?action=products/remove'))
      .type('form')
      .send(data)
      .on('error', handleError)
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didGoodRemoveFromCart', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  orderRecount(params) {
    xhr('post', join('', connectorsUrl, connector, '?action=recalculate'))
      .type('form')
      .send(params.data)
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didCartRefresh', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  cartRefresh(params) {
    xhr('post', join('', connectorsUrl, connector, '?action=getdata'))
      .type('form')
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didCartRefresh', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  cartReset(params) {
    xhr('post', join('', connectorsUrl, connector, '?action=reset'))
      .type('form')
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didCartReset', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  /**
      @params   Object {
        data: String queryString,
        callback: Function
      }
  **/
  formSubmit(params) {
    xhr('post', join('', modxsiteConnectorsUrl, connector))
      .type('form')
      .send(params.data)
      .end(parseXHRResponse(function(respData) {

        requestAction.call(actions, 'didFormSubmit', {
          resp: respData.resp,
          req: params
        });

      }))
  }

  /**
      @params   Object {
        data: Object FormData,
        callback: Function
      }
  **/
  formRawSubmit(params) {
    xhr('post', join('', modxsiteConnectorsUrl, connector))
      .send(params.data)
      .end(parseXHRResponse(function(data) {

        requestAction.call(actions, 'didFormSubmit', {
          resp: data.resp,
          req: params
        });

      }))
  }

// userAuth(params) {
//   let {data} = params;
//   xhr('post', join('', modxsiteConnectorsUrl, connector, '?action=login'))
//     .type('form')
//     .send(data)
//     .end(parseXHRResponse(function(data) {
//       Actions.prototype.didUserAuth({
//         resp: data.resp,
//         req: params
//       })
//     }))
// }
}
