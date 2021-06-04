import {luckyEvent} from '@/api/lucky';
import {getQueryVariable} from '@/utils';
export const reportLog=(extra={})=>{
    return new Promise(resolve=>{
        let params =Object.assign(extra,{hid:getQueryVariable('hid'),spm:getQueryVariable('spm')}) ;
        luckyEvent(params).then(res=>{
            resolve(res)
        })
    })
}