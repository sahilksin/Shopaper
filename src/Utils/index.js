import dbMethods from './store' // To store data on indexDB
import time from './time'

let utils = {}

utils.add_new = dbMethods.add_new
utils.fetchData = dbMethods.fetchData
utils.deleteTable = dbMethods.deleteTable
utils.time = time

export default utils