/**
 * @desc 处理async/await错误捕捉
 **/
export const awaitWrap = (promise) => {
    return promise
        .then(data => [null, data])
        .catch(err => [err, null]);
};

