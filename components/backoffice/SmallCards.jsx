import React from 'react'
import SmallCard from './SmallCard'
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from 'lucide-react'

 export default function SmallCards({orders}) {
    const status = {
        pending:"PENDING",
        processing:"PROCESSING",
        shipping:"SHIPPED",
        delivering:"DELIVERED",
        cancelling:"CANCELED"
      }
      function getOrdersCountByStatus(status){
       const filteredOrders= orders.filter((order)=>order.orderStatus === status);
       const count = filteredOrders.length.toString().padStart(2,"0");
       return count;
      }
    const ordersCount = orders.length.toString().padStart(2,"0");
    const pendingOrdersCount = getOrdersCountByStatus(status.pending);
    const processingOrdersCount = getOrdersCountByStatus(status.processing);
    const shippingOrdersCount = getOrdersCountByStatus(status.shipping);
    const deliveringOrdersCount = getOrdersCountByStatus(status.delivering);
    const cancellingOrdersCount = getOrdersCountByStatus(status.cancelling);

    const orderStatus = [
        {
            title:"Today Orders",
            number:ordersCount,
            iconBg:"bg-green-600",
            icon:ShoppingCart
        },
        {
            title:"Orders Pending",
            number:pendingOrdersCount,
            iconBg:"bg-blue-600",
            icon:Loader2
        },
        {
            title:"Orders Processing",
            number:processingOrdersCount,
            iconBg:"bg-orange-600",
            icon:RefreshCcw
        },
        {
            title:"Orders Delivered",
            number:deliveringOrdersCount,
            iconBg:"bg-purple-600",
            icon:CheckCheck
        }
    ]
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
        {
            orderStatus.map((data, index) => {
                return(
                    <SmallCard data={data} key={index}/>
                )
            })
        }
    </div>
  )
}
