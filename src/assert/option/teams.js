import {data} from '../data/data_with_totalDetails'

const t = Object.keys(data)
export const teams = t.map((tt, index) => {
    return {key: index, value: tt}
})