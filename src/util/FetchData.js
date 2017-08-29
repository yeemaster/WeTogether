export const FetchUtil = {}

FetchUtil.get = (url,params) => {
    if (params) {
        let paramsArray = [];

        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise((resolve,reject) => {
       fetch(
          url,
          {
             method : 'GET'
          }
       )
       // .then((response)=> response.json())
       .then((response)=> {     console.log(response); return response.json()})
       .then((responseData) => {
          resolve(responseData);
       })
       .catch((error)=>{
          reject(error);
       })
    })
}

FetchUtil.post = (url,params={},headers) => {
   return new Promise((resolve,reject) => {
      fetch(
         url,
         {
           method : 'POST',
           headers,
           body : JSON.stringify(params)
         }
      )
      .then((response)=> response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error)=>{
        reject(error);
      })
   })
}
